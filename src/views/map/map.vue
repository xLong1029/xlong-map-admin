<template>
  <div class="map-container">
    <div :id="mapId" :class="{ 'show-header': fixedHeader }"></div>
    <screenshot @close="onCloseScreenshot" />
  </div>
</template>

<script>
import { onMounted, watch, inject } from "@vue/runtime-core";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
// 组件
import Screenshot from "components/map/Screenshot/index.vue";
// 地图事件
import mapEvents from "common/mapEvents/index.js";
// 地图
import map from "common/map/index.js";
import layers from "common/map/layers.js";

export default {
  name: "Map",

  props: {
    // 地图容器id
    mapId: {
      type: String,
      default: "mainMap",
    },
  },

  components: { Screenshot },

  setup(props, { emit }) {
    const { mapEvent, mapViewConfig } = map();

    const {
      imageBasemapLayer,
      vectorBasemapGroupLayer,
      terrainBasemapNoteGroupLayer,
      graphicsLayer,
    } = layers();

    // 获取顶级组件传递的值：当前地图视图是2D或者3D
    const mapViewType = inject("getMapViewType");
    // 摄像机信息
    const cameraInfo = inject("getCameraInfo");
    // 坐标信息
    const coordInfo = inject("getCoordInfo");
    // 是否显示系统固定头部
    const fixedHeader = inject("getFixedHeader");

    let arcGisMap = null;
    let arcGisMapView = null;

    // 监听地图事件传递
    watch(
      () => mapEvent.value,
      (events) => {
        if (events.length) {
          return events.forEach((e) => {
            const { event, data } = e;
            // console.log(event, data);

            mapEvents()[event](arcGisMapView, data, mapViewType.value);

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
            ...mapViewConfig,
          },
          val
        );

        changeMapCameraInfo(0, 0);
        changeCoordInfoTiltHeading(0, 0);
      }
    );

    onMounted(() => {
      arcGisMap = initMap();

      createView(
        {
          map: arcGisMap,
          ...mapViewConfig(props.mapId),
        },
        mapViewType.value
      );
    });

    /**
     * 初始化地图
     */
    const initMap = () => {
      const layerList = [
        imageBasemapLayer,
        vectorBasemapGroupLayer,
        terrainBasemapNoteGroupLayer,
      ];

      const basemap = new Basemap({
        baseMapLayers: layerList,
      });

      let map = new Map({
        basemap,
      });

      layerList.forEach((e) => {
        map.add(e);
      });

      return map;
    };

    /**
     * 创建视图
     * @param {*} params 视图参数
     * @param {*} type 视图类型
     */
    const createView = (params, type) => {
      console.log(type);
      arcGisMapView =
        type === "2D"
          ? new MapView(params)
          : new SceneView({
              ...params,
              zoom: 1,
            });

      arcGisMapView.scale = coordInfo.scale;

      arcGisMapView.map.add(graphicsLayer);

      arcGisMapView.ui.empty("top-left");
      // 移除powered by
      arcGisMapView.ui._removeComponents(["attribution"]);

      setViewMouseEvent(mapViewType.value);

      if (type === "3D") {
        initCamera(arcGisMapView);
      }
    };

    /**
     * 初始化摄像机
     *
     * @param {*} arcGisMapView 视图对象
     * @param {*} animation 是否显示进场动画
     * @param {*} duration 动画持续时间
     */
    const initCamera = (arcGisMapView, animation = false, duration = 5000) => {
      let gotoInfo = {
        center: [coordInfo.lon, coordInfo.lat],
        tilt: cameraInfo.value.tilt,
        heading: cameraInfo.value.heading,
        zoom: 17,
      };

      if (!animation) {
        gotoInfo.tilt = 0;
        gotoInfo.heading = 0;
        gotoInfo.zoom = 17;
        duration = 0;
      }

      arcGisMapView.when(function () {
        setTimeout(
          () => {
            arcGisMapView.goTo(gotoInfo, { duration }).then(() => {
              // 摄像机移动结束设置当前比例
              changeMapViewScale(Math.round(arcGisMapView.scale));
            });
          },
          animation ? 1500 : 0
        );

        // 监听摄像机
        arcGisMapView.watch("camera", (camera) => {
          let tilt = camera.tilt;
          let heading = camera.heading;
          // let position = camera.position;
          // console.log(tilt, heading, position);

          changeMapCameraInfo(tilt, heading);
          changeCoordInfoTiltHeading(tilt, heading);
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

      arcGisMapView.on("drag", (e) => {
        if (mapViewType.value == "3D") {
          const { tilt, heading } = arcGisMapView.camera;
          changeCoordInfoTiltHeading(tilt, heading);
        }
      });

      // 鼠标滚轮事件
      arcGisMapView.on("mouse-wheel", () => {
        changeMapViewScale(Math.round(arcGisMapView.scale));
      });
    };

    // 修改地图摄像机位置
    const changeMapCameraInfo = (tilt, heading) => {
      emit("map-camera-change", {
        tilt,
        heading,
      });
    };

    // 修改地图视图比例
    const changeMapViewScale = (scale) => {
      emit("map-scale-change", { scale });
    };

    // 修改地图视图比例
    const changeCoordInfoTiltHeading = (tilt, heading) => {
      emit("map-drag", {
        tilt: mapViewType.value === "2D" ? "0.00" : parseFloat(tilt).toFixed(2),
        heading: mapViewType.value === "2D" ? "0.00" : parseFloat(heading).toFixed(2),
      });
    };

    // 设置地图视图比例-父组件调用
    const onSetScale = (scale) => {
      arcGisMapView.scale = scale;
    };

    // 关闭截图功能
    const onCloseScreenshot = () => {
      arcGisMapView.container.classList.remove("screenshotCursor");
      emit("close-screenshot");
    };

    return {
      fixedHeader,
      onSetScale,
      onCloseScreenshot,
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
