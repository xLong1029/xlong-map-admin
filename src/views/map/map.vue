<template>
  <div class="map-container">
    <div :id="mapId" :class="{ 'show-header': fixedHeader }"></div>
    <screenshot @close="onCloseScreenshot" />
  </div>
</template>

<script>
import { onMounted, computed, watch, inject } from "@vue/runtime-core";
import { useStore } from "vuex";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Basemap from "@arcgis/core/Basemap";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
// 组件
import Screenshot from "components/map/Screenshot/index.vue";
// 地图事件
import map from "common/map/index.js";
// 配置
// import config from "config/index.js";

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
    const store = useStore();

    // 获取顶级组件传递的值：当前地图视图是2D或者3D
    const mapViewType = inject("getMapViewType");
    // 摄像机信息
    const cameraInfo = inject("getCameraInfo");
    // 坐标信息
    const coordInfo = inject("getCoordInfo");
    // 是否显示系统固定头部
    const fixedHeader = inject("getFixedHeader");
    // 地图底图
    const basemap = inject("getBasemap");

    // 地图事件传递
    const mapEvent = computed(() => store.getters.mapEvent);

    let arcGisMap = null;
    let arcGisMapView = null;
    let graphicsLayer = null;

    // 地图参数配置
    const mapConfig = {
      container: props.mapId,
      alphaCompositingEnabled: true,
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

        changeMapCameraInfo(0, 0);
        changeCoordInfoTiltHeading(0, 0);
      }
    );

    // 监听底图改变
    // watch(
    //   () => basemap.value,
    //   (val) => {
    //     arcGisMap = new Map({
    //       basemap: "hybrid",
    //       ground: "world-elevation",
    //       logo: false,
    //     });

    //     // createView(
    //     //   {
    //     //     map: arcGisMap,
    //     //     ...mapConfig,
    //     //   },
    //     //   mapViewType.value
    //     // );

    //     // // 摆正罗盘
    //     // emit("map-camera-change", {
    //     //   tilt: 0,
    //     //   heading: 0,
    //     // });
    //     return;
    //   }
    // );

    onMounted(() => {
      arcGisMap = initMap();
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
     */
    const initMap = () => {
      let map = new Map({});

      const tdtImageLayer = () => {
        const tileInfoConfig = {
          dpi: 90.71428571427429,
          rows: 256,
          cols: 256,
          compressionQuality: 0,
          origin: {
            x: -180,
            y: 90,
          },
          spatialReference: {
            wkid: 4490,
          },
          lods: [
            {
              level: 0,
              levelValue: 1,
              resolution: 0.703125,
              scale: 295497593.05875003,
            },
            {
              level: 1,
              levelValue: 2,
              resolution: 0.3515625,
              scale: 147748796.52937502,
            },
            {
              level: 2,
              levelValue: 3,
              resolution: 0.17578125,
              scale: 73874398.264687508,
            },
            {
              level: 3,
              levelValue: 4,
              resolution: 0.087890625,
              scale: 36937199.132343754,
            },
            {
              level: 4,
              levelValue: 5,
              resolution: 0.0439453125,
              scale: 18468599.566171877,
            },
            {
              level: 5,
              levelValue: 6,
              resolution: 0.02197265625,
              scale: 9234299.7830859385,
            },
            {
              level: 6,
              levelValue: 7,
              resolution: 0.010986328125,
              scale: 4617149.8915429693,
            },
            {
              level: 7,
              levelValue: 8,
              resolution: 0.0054931640625,
              scale: 2308574.9457714846,
            },
            {
              level: 8,
              levelValue: 9,
              resolution: 0.00274658203125,
              scale: 1154287.4728857423,
            },
            {
              level: 9,
              levelValue: 10,
              resolution: 0.001373291015625,
              scale: 577143.73644287116,
            },
            {
              level: 10,
              levelValue: 11,
              resolution: 0.0006866455078125,
              scale: 288571.86822143558,
            },
            {
              level: 11,
              levelValue: 12,
              resolution: 0.00034332275390625,
              scale: 144285.93411071779,
            },
            {
              level: 12,
              levelValue: 13,
              resolution: 0.000171661376953125,
              scale: 72142.967055358895,
            },
            {
              level: 13,
              levelValue: 14,
              resolution: 8.58306884765625e-5,
              scale: 36071.483527679447,
            },
            {
              level: 14,
              levelValue: 15,
              resolution: 4.291534423828125e-5,
              scale: 18035.741763839724,
            },
            {
              level: 15,
              levelValue: 16,
              resolution: 2.1457672119140625e-5,
              scale: 9017.8708819198619,
            },
            {
              level: 16,
              levelValue: 17,
              resolution: 1.0728836059570313e-5,
              scale: 4508.9354409599309,
            },
            {
              level: 17,
              levelValue: 18,
              resolution: 5.3644180297851563e-6,
              scale: 2254.4677204799655,
            },
            {
              level: 18,
              levelValue: 19,
              resolution: 2.68220901489257815e-6,
              scale: 1127.23386023998275,
            },
            {
              level: 19,
              levelValue: 20,
              resolution: 1.341104507446289075e-6,
              scale: 563.616930119991375,
            },
          ],
        };
        let tileInfo = new TileInfo({ ...tileInfoConfig });

        //外网地址
        let tdtUrl =
          "https://{subDomain}.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=4267820f43926eaf808d61dc07269beb";
        let tdtLayer = new WebTileLayer(tdtUrl, {
          id: "tdt",
          title: "tdt",
          subDomains: ["t0"],
          tileInfo: tileInfo,
          spatialReference: { wkid: 4490 }, //重点在这一句,如果不指定,那么默认为102100,在前端就会报坐标系的错误
          fullExtent: {
            xmin: -180,
            ymin: -90,
            xmax: 180,
            ymax: 90,
            spatialReference: 4490,
          },
          // visible:false
          // maxScale:5000
        });
        return tdtLayer;
      };

      map.basemap = new Basemap({
        baseMapLayers: [tdtImageLayer()],
      });

      map.add(tdtImageLayer());

      // const vectorBasemap = new TileLayer({
      //   title: "中文矢量地图",
      //   id: "vectorBasemap",
      //   // url:
      //   //   "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
      //   url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=967eee390c6f9d1a84a3c072dcb9f51d",
      //   visible: true,
      // });

      return map;
    };

    /**
     * 创建视图
     * @param {*} params 视图参数
     * @param {*} type 视图类型
     */
    const createView = (params, type) => {
      // arcGisMapView = type === "2D" ? new MapView(params) : new SceneView(params);

      arcGisMapView = new SceneView({
        ...params,
        zoom: 1,
        constraints: {
          snapToZoom: false,
          viewingMode: "local",
          // maxZoom: 20,
        },
        spatialReference: { wkid: 4490 },
      });

      arcGisMapView.scale = coordInfo.scale;

      graphicsLayer = new GraphicsLayer({
        id: "graphicsLayer",
        title: "graphicsLayer",
        spatialReference: { wkid: 4490 },
         elevationInfo: {
          mode: "on-the-ground",
        },
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
     * @param {*} animation 是否显示进场动画
     * @param {*} duration 动画持续时间
     */
    const initCamera = (arcGisMapView, animation = true, duration = 5000) => {
      let gotoInfo = {
        center: [coordInfo.lon, coordInfo.lat],
        tilt: cameraInfo.value.tilt,
        heading: cameraInfo.value.heading,
        zoom: 17,
      };

      if (!animation) {
        gotoInfo.tilt = 0;
        gotoInfo.heading = 0;
        gotoInfo.zoom = 1;
        duration = 0;
      }

      arcGisMapView.when(function () {
        arcGisMapView.goTo({ ...gotoInfo }, { duration }).then(() => {
          // 摄像机移动结束设置当前比例
          changeMapViewScale(Math.round(arcGisMapView.scale));
        });

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
