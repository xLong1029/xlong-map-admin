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
        <template #left>功能建设中...</template>
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
import { defineProps, defineEmits, inject, onMounted } from "@vue/runtime-core";
// Arcgis
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
// 组件
import MaxScreenPanel from "components/common/MaxScreenPanel/index.vue";
import UtilPanel from "components/common/UtilPanel/index.vue";
import CollapsePanel from "components/common/CollapsePanel/index.vue";
// 通用模块
import maxScreenPanel from "common/maxScreenPanel.js";
// 地图
import map from "common/map/index.js";
import layers from "common/map/layers.js";

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

const { mapViewConfig } = map();

const { imageBasemapLayer } = layers();

// 是否显示系统固定头部
const fixedHeader = inject("getFixedHeader");
// 坐标信息
const coordInfo = inject("getCoordInfo");

let swipeMap = null;
let swipeMapView = null;
// 地图ID
const mapID = "swipeMap";

onMounted(() => {
  console.log(124);
  initMap();
});

// 初始化地图
const initMap = () => {
  let map = new Map({
    basemap: new Basemap({
      baseMapLayers: [imageBasemapLayer],
    }),
  });

  map.add(imageBasemapLayer);

  let view = new MapView({
    map,
    ...mapViewConfig(mapID),
    center: [108.37586, 22.81221],
    zoom: 14,
  });

  view.ui.move("zoom", "bottom-right");

  // 移除powered by
  view.ui._removeComponents(["attribution"]);

  swipeMap = map;
  swipeMapView = view;
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
</style>
