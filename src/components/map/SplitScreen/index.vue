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
    class="split-screen"
  >
    <template #content>
      <CollapsePanel>
        <template #left>功能建设中...</template>
        <template #right>
          <!-- <div :id="mapID" :class="{ 'show-header': fixedHeader }"></div> -->
          <div
            v-for="(item, index) in viewCount"
            :key="index"
            :id="`splitScreenMapView${index}`"
            class="map-view"
            ref="mapView"
          >
            <div
              class="map-view__map"
              :id="`splitScreenMapView${index}`"
              v-show="viewVisibleNum >= index"
            ></div>
            <div class="map-view__title" :id="'mapviewtitle' + index">
              {{ getViewTitle(index) }}
            </div>
          </div>
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
    :title="`${panel.utilName}工具`"
    :show-help-icon="false"
    :show-max-icon="true"
    :show-content="false"
    @on-click-close="onClose"
    @on-click-max="onMaximize"
  >
  </UtilPanel>
</template>

<script setup>
import { ref, defineProps, defineEmits, inject, onMounted } from "@vue/runtime-core";
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

const { mapCenterPoint, mapViewConfig } = map();

const { imageBasemapLayer } = layers();

// 是否显示系统固定头部
const fixedHeader = inject("getFixedHeader");
// 坐标信息
const coordInfo = inject("getCoordInfo");

// 地图ID
const mapID = "splitScreen0";
let splitScreenView = null;
// 地图视图
const viewCount = ref(new Array(6).fill(0));
const viewVisibleNum = ref(6);
const viewWinOne = ref(false);
const viewWinTwo = ref(false);
const viewWinThree = ref(false);
const viewWinFour = ref(false);
const viewWinFive = ref(false);
const viewWinSix = ref(false);

onMounted(() => {
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
    center: mapCenterPoint,
    zoom: 14,
  });

  view.ui.move("zoom", "bottom-right");

  // 移除powered by
  view.ui._removeComponents(["attribution"]);
  splitScreenView = view;
};

// 获取视图标题
const getViewTitle = (index) => {
  // if (viewLayer.value[index]) {
  //   return viewLayer.value[index].text ? viewLayer.value[index].text : "暂无标题";
  // }
  return "暂无标题";
};

// 改变视图数量
const changeViewCount = (val) => {
  viewVisibleNum.value = val;
  changeLayOut(val); // 改布局

  switch (Number(val)) {
    case 1:
      viewWinOne.value = true;
      viewWinTwo.value = false;
      viewWinThree.value = false;
      viewWinFour.value = false;
      viewWinFive.value = false;
      viewWinSix.value = false;
      break;
    case 2:
      viewWinOne.value = true;
      viewWinTwo.value = true;
      viewWinThree.value = false;
      viewWinFour.value = false;
      viewWinFive.value = false;
      viewWinSix.value = false;
      break;
    case 3:
      viewWinOne.value = true;
      viewWinTwo.value = true;
      viewWinThree.value = true;
      viewWinFour.value = false;
      viewWinFive.value = false;
      viewWinSix.value = false;
      break;
    case 4:
      viewWinOne.value = true;
      viewWinTwo.value = true;
      viewWinThree.value = true;
      viewWinFour.value = true;
      viewWinFive.value = false;
      viewWinSix.value = false;
      break;
    case 5:
      viewWinOne.value = true;
      viewWinTwo.value = true;
      viewWinThree.value = true;
      viewWinFour.value = true;
      viewWinFive.value = true;
      viewWinSix.value = false;
      break;
    case 6:
      viewWinOne.value = true;
      viewWinTwo.value = true;
      viewWinThree.value = true;
      viewWinFour.value = true;
      viewWinFive.value = true;
      viewWinSix.value = true;
      break;
    default:
      break;
  }
};

// 改变布局
const changeLayOut = (index) => {
  const splitScreenMapView0 = document.getElementById("splitScreenMapView0");
  const splitScreenMapView1 = document.getElementById("splitScreenMapView1");
  const splitScreenMapView2 = document.getElementById("splitScreenMapView2");
  const splitScreenMapView3 = document.getElementById("splitScreenMapView3");
  const splitScreenMapView4 = document.getElementById("splitScreenMapView4");
  const splitScreenMapView5 = document.getElementById("splitScreenMapView5");
  const splitScreenMapView6 = document.getElementById("splitScreenMapView6");

  switch (index) {
    case 1:
      nextTick(() => {
        splitScreenMapView0.style.width = "100%";
        splitScreenMapView0.style.height = "100%";
      });
      break;
    case 2:
      nextTick(() => {
        splitScreenMapView0.style.width = "50%";
        splitScreenMapView1.style.width = "50%";
        splitScreenMapView0.style.height = "100%";
        splitScreenMapView1.style.height = "100%";
      });
      break;
    case 3:
      nextTick(() => {
        splitScreenMapView0.style.width = "100%";
        splitScreenMapView1.style.width = "50%";
        splitScreenMapView2.style.width = "50%";
        splitScreenMapView0.style.height = "50%";
        splitScreenMapView1.style.height = "50%";
        splitScreenMapView2.style.height = "50%";
      });
      break;
    case 4:
      nextTick(() => {
        splitScreenMapView0.style.width = "50%";
        splitScreenMapView1.style.width = "50%";
        splitScreenMapView2.style.width = "50%";
        splitScreenMapView3.style.width = "50%";
        splitScreenMapView0.style.height = "50%";
        splitScreenMapView1.style.height = "50%";
        splitScreenMapView2.style.height = "50%";
        splitScreenMapView3.style.height = "50%";
      });
      break;
    case 5:
      nextTick(() => {
        splitScreenMapView0.style.width = "50%";
        splitScreenMapView1.style.width = "50%";
        splitScreenMapView2.style.width = "33.3%";
        splitScreenMapView3.style.width = "33.3%";
        splitScreenMapView4.style.width = "33.3%";
        splitScreenMapView0.style.height = "50%";
        splitScreenMapView1.style.height = "50%";
        splitScreenMapView2.style.height = "50%";
        splitScreenMapView3.style.height = "50%";
        splitScreenMapView4.style.height = "50%";
      });
      break;
    case 6:
      nextTick(() => {
        splitScreenMapView0.style.width = "33.3%";
        splitScreenMapView1.style.width = "33.3%";
        splitScreenMapView2.style.width = "33.3%";
        splitScreenMapView3.style.width = "33.3%";
        splitScreenMapView4.style.width = "33.3%";
        splitScreenMapView5.style.width = "33.3%";
        splitScreenMapView0.style.height = "50%";
        splitScreenMapView1.style.height = "50%";
        splitScreenMapView2.style.height = "50%";
        splitScreenMapView3.style.height = "50%";
        splitScreenMapView4.style.height = "50%";
        splitScreenMapView5.style.height = "50%";
      });
      break;
    default:
      break;
  }
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
#splitScreen {
  width: 100%;
  height: 100%;
}

.map-view {
  border: #eeeeee 2px solid;
  display: none;
  position: relative;

  &__map {
    height: calc(100% - 20px);
  }

  &__title {
    background: #fff;
    height: 20px;
    text-align: center;
  }
}
</style>
