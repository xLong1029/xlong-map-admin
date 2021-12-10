<template>
  <!-- 窗口最大化 -->
  <max-screen-panel
    :style="{ display: minimize ? 'none' : 'block' }"
    :title="`${panel.utilName}工具`"
    :icon-class-styles="panel.classStyles"
    :minimize="minimize"
    :fixed-header="fixedHeader"
    @minimize="onMinimize"
    @close="onClose"
    class="swipe-panel"
  >
    <template #content>
      <CollapsePanel>
        <template #left>
          <el-tabs v-model="activeTabName">
            <el-tab-pane label="图层资源" name="layers">
              <div
                class="layer-transfer"
                v-loading="transferLoading"
                element-loading-text="正在加载数据..."
              >
                <el-transfer
                  v-model="transferValue"
                  :data="transferLayers"
                  :titles="transferTitles"
                  @change="onChangeLayer"
                  :props="{
                    key: 'id',
                    label: 'label',
                  }"
                ></el-transfer>
              </div>
            </el-tab-pane>
            <el-tab-pane label="卷帘设置" name="settings">
              <div class="swipe-panel-setting">
                <el-form label-width="70px">
                  <el-form-item label="启用卷帘" class="mb-15">
                    <el-switch v-model="openSwipe" size="mini"> </el-switch>
                  </el-form-item>
                  <el-form-item label="卷帘方向">
                    <el-radio-group v-model="swipeDirection" @change="onChangeSwipeType">
                      <el-radio label="vertical">垂直</el-radio>
                      <el-radio label="horizontal">水平</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <template #right>
          <div :id="mapID" :class="{ 'show-header': fixedHeader }"></div>
        </template>
      </CollapsePanel>
    </template>
  </max-screen-panel>
  <!-- 窗口最小化 -->
  <UtilPanel
    v-if="minimize"
    width="260px"
    top="63px"
    right="15px"
    :title="`${panel.utilName}分析工具`"
    :show-help-icon="false"
    :show-max-icon="true"
    :show-content="false"
    @on-click-close="onClose"
    @on-click-max="onMaximize"
  >
  </UtilPanel>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  inject,
  onMounted,
  watch,
  nextTick,
} from "@vue/runtime-core";
// Arcgis
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
// 组件
import MaxScreenPanel from "components/common/MaxScreenPanel/index.vue";
import UtilPanel from "components/common/UtilPanel/index.vue";
import CollapsePanel from "components/common/CollapsePanel/index.vue";
// 通用模块
import maxScreenPanel from "common/maxScreenPanel.js";
// 地图事件
import mapEvents from "common/mapEvents/index.js";
// 地图
import map from "common/map/index.js";
import layers from "common/map/layers.js";
// 配置
import { TDT_TOKEN } from "config/index.js";

const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({}),
  },
  // 当前面板索引在panelList中的索引
  index: {
    type: Number,
    default: 0,
  },
  // 是否最小化
  minimize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "minimize", "maximize"]);

const { onClosePanel, onMinimizePanel, onMaximizePanel } = maxScreenPanel();

const { mapCenterPoint, mapViewConfig } = map();

const { tdtBaseUrl, imageBasemapLayer, imageBasemapNoteLayer } = layers();

// 是否显示系统固定头部
const fixedHeader = inject("getFixedHeader");
// 坐标信息
const coordInfo = inject("getCoordInfo");

let swipeMap = null;
let swipeMapView = null;
// 地图ID
const mapID = "swipeMap";

const activeTabName = ref("layers");

// 穿梭框配置
const transferValue = ref(["image"]);
const transferLayers = ref([
  {
    id: "image",
    label: "天地图影像",
    url: `${tdtBaseUrl}/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=${TDT_TOKEN}`,
  },
  {
    id: "terrain",
    label: "天地图地形晕渲",
    url: `${tdtBaseUrl}/ter_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ter&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=${TDT_TOKEN}`,
  },
]);
const transferLoading = ref(false);
const transferTitles = ref(["上方", "下方"]);

const swipeDirection = ref("vertical");

const openSwipe = ref(false);

// 监听卷帘开启/禁用变化
watch(
  () => openSwipe.value,
  (val) => {
    if (swipeMapView) {
      const eventName = val ? "onOpenSwipe" : "onRemoveSwipe";
      mapEvents()[eventName](swipeMapView, {
        direction: swipeDirection.value,
      });
    } else {
      console.log("找不到可操作的地图视图");
    }
  }
);

onMounted(() => {
  nextTick(() => {
    init();
  });
});

// 初始化
const init = () => {
  const layerList = [imageBasemapLayer, imageBasemapNoteLayer];

  const basemap = new Basemap({
    baseMapLayers: layerList,
  });

  let map = new Map({
    basemap,
  });

  layerList.forEach((e) => {
    map.add(e);
  });

  // transferLayers.value.forEach((e) => {
  //   const { id, url } = e;
  //   const layer = new TileLayer({
  //     id,
  //     url,
  //   });

  //   map.add(layer);
  // });

  let view = new MapView({
    map,
    ...mapViewConfig(mapID),
    center: mapCenterPoint,
    zoom: 14,
  });

  view.ui.move("zoom", "bottom-right");

  // 移除powered by
  view.ui._removeComponents(["attribution"]);

  // 定位到南宁全域范围
  mapEvents()["onLocateToExtent"](view, {
    extent: {
      center: mapCenterPoint,
      tilt: 0,
      heading: 0,
      zoom: 10,
    },
    params: { duration: 3000 },
  });

  swipeMap = map;
  swipeMapView = view;

  openSwipe.value = true;
};

// 改变卷帘方式
const onChangeSwipeType = (val) => {
  // 垂直
  if (val === "vertical") {
    transferTitles.value = ["上方", "下方"];
  }
  // 水平
  else {
    transferTitles.value = ["左侧", "右侧"];
  }

  console.log(val);

  if (openSwipe.value) {
    mapEvents()["onChangeSwipeDirection"](swipeMapView, {
      direction: val,
    });
  }
};

// 改变图层
const onChangeLayer = () => {
  const data = {
    leadingLayers: [],
    trailingLayers: [],
  };

  //左侧数据
  transferValue.value.forEach((layer, index) => {
    if (index > 0) {
      data.trailingLayers.push(layer);
    }
  });

  //右侧数据
  transferLayers.value.forEach((layer) => {
    if (data.trailingLayers.indexOf(layer.id) === -1) {
      data.leadingLayers.push(layer.id);
    }
  });

  // if (openSwipe.value) {
  //   setTimeout(function () {
  //     dispatchMapEvent("onChangeSwipeLayer", data);
  //   }, 1000);
  // }
};

// 关闭面板
const onClose = () => {
  onClosePanel(emit, props);
};

// 最小化
const onMinimize = () => {
  onMinimizePanel(emit, props);
};

// 最大化
const onMaximize = () => {
  onMaximizePanel(emit, props);
};
</script>

<style lang="scss" scoped>
#swipeMap {
  width: 100%;
  height: 100%;
}

.swipe-way {
  display: flex;
  align-items: center;
}

.layer-transfer {
  :deep(.el-transfer) {
    display: flex;
  }

  :deep(.el-transfer__buttons) {
    display: flex;
    padding: 0 12px;
    flex-direction: column;
    align-self: center;

    .el-button + .el-button {
      margin: 0;
    }
  }

  :deep(.el-checkbox__label) {
    font-size: 14px;
  }

  :deep(.el-transfer-panel__header) {
    margin-top: -5px;
  }
}
</style>
