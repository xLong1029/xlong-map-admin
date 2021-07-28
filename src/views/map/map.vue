<template>
  <div class="map-container">
    <div
      :id="mapId"
      :class="[
        fixedHeader ? 'show-header' : '',
        mapOperatePanel ? 'has-operate-panel' : '',
      ]"
    ></div>
  </div>
</template>

<script>
import { onMounted, computed, watch, inject } from "@vue/runtime-core";
import { useStore } from "vuex";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// 地图事件
import map from "common/map/index.js";

export default {
  name: "Map",

  props: {
    // 是否显示操作栏目
    mapOperatePanel: {
      type: Boolean,
      default: true,
    },
    // 地图容器id
    mapId: {
      type: String,
      default: "mainMap",
    },
  },

  setup(props, { emit }) {
    const store = useStore();

    // 获取顶级组件传递的值：当前地图视图是2D或者3D
    const mapViewType = inject("getMapViewType");
    // 摄像机信息
    const cameraInfo = inject("getCameraInfo");
    // 坐标信息
    const coordInfo = inject("getCoordInfo");
    // 是否显示系统固定头部
    const fixedHeader = inject("getFixedHeader");
    
    // 地图事件传递
    const mapEvent = computed(() => store.getters.mapEvent);

    let arcGisMap = null;
    let arcGisMapView = null;
    let graphicsLayer = null;

    // 地图参数配置
    const mapConfig = {
      container: props.mapId,
      center: [coordInfo.lon, coordInfo.lat],
      alphaCompositingEnabled: true,
      zoom: 19,
      environment: {
        background: {
          type: "color",
          color: [0, 0, 0],
        },
        starsEnabled: true,
        atmosphereEnabled: true,
      },
      constraints: {
        rotationEnabled: false,
      },
    };

    // 监听地图事件传递
    watch(
      () => mapEvent.value,
      (events) => {
        if (events.length) {
          return events.forEach((e) => {
            const { event, data } = e;
            // console.log(event, data);

            // 切换底图
            if (event === "onSwitchMap") {
              arcGisMap = initMap(data.basemap);
              createView(
                {
                  map: arcGisMap,
                  ...mapConfig,
                },
                mapViewType.value
              );

              // 摆正罗盘
              emit("map-camera-change", {
                tilt: 0,
                heading: 0,
              });
              return;
            }

            map()[event](arcGisMapView, data, mapViewType.value);

            // 放大缩小
            if (event === "onZoomIn" || event === "onZoomOut") {
              changeMapViewScale(Math.round(arcGisMapView.scale));
            }
          });
        }
      }
    );

    // 监听视图改变
    watch(
      () => mapViewType.value,
      (val) => {
        createView(
          {
            map: arcGisMap,
            ...mapConfig,
          },
          val
        );
      }
    );

    onMounted(() => {
      arcGisMap = initMap("hybrid");
      createView(
        {
          map: arcGisMap,
          ...mapConfig,
        },
        mapViewType.value
      );
      initCamera(arcGisMapView);
    });

    /**
     * 初始化地图
     * @param {*} basemap 底图类型
     */
    const initMap = (basemap) => {
      // 地图
      return new Map({
        basemap,
        ground: "world-elevation",
        logo: false,
      });
    };

    /**
     * 创建视图
     * @param {*} params 视图参数
     * @param {*} type 视图类型
     */
    const createView = (params, type) => {
      arcGisMapView = type === "2D" ? new MapView(params) : new SceneView(params);

      arcGisMapView.scale = coordInfo.scale;

      graphicsLayer = new GraphicsLayer({
        id: "graphicsLayer",
        title: "graphicsLayer",
        spatialReference: { wkid: 4490 },
      });

      arcGisMapView.map.add(graphicsLayer);

      arcGisMapView.ui.empty("top-left");
      // 移除powered by
      arcGisMapView.ui._removeComponents(["attribution"]);

      setViewMouseEvent(mapViewType.value);
    };

    /**
     * 初始化摄像机
     *
     * @param {*} arcGisMapView 视图对象
     */
    const initCamera = (arcGisMapView) => {
      arcGisMapView.when(function () {
        arcGisMapView
          .goTo(
            {
              center: [coordInfo.lon, coordInfo.lat],
              tilt: cameraInfo.value.tilt,
              heading: cameraInfo.value.heading,
              zoom: 18.7,
            },
            { duration: 5000 }
          )
          .then(function () {
            // 摄像机移动结束改变罗盘位置
            emit("map-camera-change", {
              tilt: arcGisMapView.camera.tilt,
              heading: arcGisMapView.camera.heading,
            });
            // 设置当前比例
            changeMapViewScale(Math.round(arcGisMapView.scale));

            // 监听摄像机
            arcGisMapView.watch("camera", (camera) => {
              let tilt = camera.tilt;
              let heading = camera.heading;
              // let position = camera.position;
              // console.log(tilt, heading, position);

              emit("map-camera-change", {
                tilt,
                heading,
              });
            });
          });
      });
    };

    // 地图鼠标事件
    const setViewMouseEvent = () => {
      // 鼠标移动
      arcGisMapView.on("pointer-move", (e) => {
        let point = arcGisMapView.toMap({ x: e.x, y: e.y });
        if (point) {
          const { longitude, latitude } = point;

          emit("map-pointer-move", {
            lon: parseFloat(longitude).toFixed(5),
            lat: parseFloat(latitude).toFixed(5),
          });
        }
      });

      // 鼠标滚轮事件
      arcGisMapView.on("mouse-wheel", () => {
        changeMapViewScale(Math.round(arcGisMapView.scale));
      });
    };

    // 修改地图视图比例
    const changeMapViewScale = (scale) => {
      emit("map-scale-change", { scale });
    };

    // 设置地图视图比例-父组件调用
    const onSetScale = (scale) => {
      arcGisMapView.scale = scale;
    };

    return {
      fixedHeader,
      onSetScale,
    };
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  position: relative;
}

#mainMap {
  width: 100%;
  height: 100vh;

  &.show-header {
    height: calc(100vh - #{$header-height});
  }
}
</style>
<style lang="scss">
/* 去掉地图聚焦边框 */
.esri-view-surface--inset-outline:focus::after {
  outline: none !important;
}

.esri-ui-bottom-right {
  right: 8px !important;
  bottom: 15px !important;
}

.esri-ui-corner {
  .esri-component {
    border-radius: $map-border-radius !important;
    overflow: hidden;
    box-shadow: $map-box-shadow !important;
    font-weight: bold !important;
    color: #666666 !important;
  }
}

.esri-zoom {
  .esri-widget--button {
    height: 30px !important;
    width: 30px !important;
    font-weight: bold;
    &:last-child {
      border-top: 1px dashed #e7e7e7 !important;
      color: #c7c7c7 !important;
    }
  }
}
</style>
