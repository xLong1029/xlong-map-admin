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
          <div class="swipe-panel-setting">
            <el-form label-width="70px" class="mt-15">
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
          <!-- <div
            class="layer-transfer"
            v-loading="transferLoading"
            element-loading-text="正在加载数据..."
          >
            <el-transfer
              size="mini"
              v-model="transferValue"
              :data="transferLayers"
              :titles="transferTitles"
              @left-check-change="leftCheckChange"
              @right-check-change="rightCheckChange"
              :props="{
                key: 'id',
                label: 'text',
              }"
              @change="onChangeLayer"
            ></el-transfer>
          </div> -->
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
} from "@vue/runtime-core";
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
// 地图事件
import mapEvents from "common/mapEvents/index.js";
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

// 穿梭框配置
const transferValue = ref([1]);
const transferLayers = ref([]);
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
  init();
});

// 初始化
const init = () => {
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
  margin-top: 20px;

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
