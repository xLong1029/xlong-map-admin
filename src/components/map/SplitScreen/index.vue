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
        <template #left>
          <div>
            <div class="title">分屏选择</div>
            <ul class="split-buttons">
              <template
                v-for="(splitButton, i) in splitButtons"
                :key="'split-button' + i"
              >
                <li
                  class="split-buttons-item"
                  :class="splitButton.active ? 'is-active' : ''"
                  @click="onClickSplitButton(i)"
                >
                  <template v-for="(item, j) in i + 1" :key="'item' + j">
                    <div
                      class="button"
                      :style="{
                        width: getSplitScreenWidth(i + 1, j),
                        height: getSplitScreenHeight(i + 1, j),
                      }"
                    >
                      {{ j + 1 }}
                    </div>
                  </template>
                </li>
              </template>
            </ul>
          </div>
          <div class="mt-15">
            <div class="title">图层资源</div>
            <el-alert
              class="mb-20"
              title="这里只做简单的演示功能，用的是AecGis服务图层"
              type="info"
              show-icon
            >
            </el-alert>
            <div>
              <el-form label-width="80px">
                <template v-for="(item, index) in viewWin" :key="'view-win' + index">
                  <el-form-item
                    v-if="index < viewVisibleNum"
                    :label="`视窗【${index + 1}】`"
                  >
                    <el-select
                      v-model="item.layer"
                      style="width: 100%"
                      @change="changeViewLayer(index)"
                    >
                      <el-option
                        v-for="(item, index) in viewLayers"
                        :key="index"
                        :label="item.title"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-form>
            </div>
          </div>
        </template>
        <template #right>
          <div class="map-view-container">
            <div
              ref="mapView"
              v-for="(item, index) in viewCount"
              :key="'map-view' + index"
              class="map-view"
              :style="{
                width: getSplitScreenWidth(viewVisibleNum, index),
                height: getSplitScreenHeight(viewVisibleNum, index),
                display: getSplitScreenDisplay(index),
              }"
            >
              <div class="map-view__map" :id="`splitScreenMapView${index + 1}`"></div>
              <div class="map-view__title" :id="'mapviewtitle' + index">
                {{ getViewTitle(index) }}
              </div>
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
import {
  ref,
  reactive,
  inject,
  onMounted,
  nextTick,
} from "@vue/runtime-core";
// Arcgis
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import TileLayer from "@arcgis/core/layers/TileLayer";
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

// 地图ID
const mapID = "splitScreenMapView";
// 地图视图
const viewCount = ref(new Array(6).fill(0));
// 图层资源
const viewLayers = [
  {
    id: "ChinaOnlineStreetPurplishBlue",
    title: "蓝黑色中文不含兴趣点版中国基础地图",
    url:
      "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
  },
  {
    id: "ChinaBoundaryLine",
    title: "中国边界线",
    url:
      "http://map.geoq.cn/arcgis/rest/services/SimpleFeature/ChinaBoundaryLine/MapServer",
  },
  {
    id: "ChinaOnlineCommunity",
    title: "彩色中文含兴趣点版中国基础地图",
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
  },
  {
    id: "ChinaOnlineCommunityENG",
    title: "彩色英文含兴趣点版中国基础地图",
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer",
  },
  {
    id: "ChinaOnlineStreetWarm",
    title: "暖色中文不含兴趣点版中国基础地图",
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer",
  },
  {
    id: "ChinaOnlineStreetGray",
    title: "灰色中文不含兴趣点版中国基础地图",
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
  },
];
// 可见视图数
const viewVisibleNum = ref(1);
// 视图群组，存储视图对象
const viewGroup = {};
// 视窗
const viewWin = reactive([
  {
    layer: "ChinaOnlineStreetPurplishBlue",
  },
  {
    layer: "ChinaBoundaryLine",
  },
  {
    layer: "ChinaOnlineCommunity",
  },
  {
    layer: "ChinaOnlineCommunityENG",
  },
  {
    layer: "ChinaOnlineStreetWarm",
  },
  {
    layer: "ChinaOnlineStreetGray",
  },
]);

// 分屏按钮
const splitButtons = reactive([
  { active: false },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
]);

// 是否第一次加载
let firstLoad = true;

onMounted(() => {
  splitButtons[0].active = true;
});

// 改变分屏选择
const onClickSplitButton = (index) => {
  splitButtons.forEach((e) => (e.active = false));
  splitButtons[index].active = true;

  viewVisibleNum.value = index + 1;
};

// 清除图层
const removeLayer = (index) => {
  // let view = viewGroup[index];
  // if (view) {
  //   view.map.removeAll();
  // }
};

/**
 * 初始化地图
 *
 * @param {*} index 当前分屏下标
 */
const initMap = (index) => {
  let view = viewGroup[index];
  const layerID = viewWin[index].layer;

  if (!view) {
    let map = new Map({
      basemap: "satellite",
    });

    view = new MapView({
      map,
      container: `${mapID}${index + 1}`,
      center: mapCenterPoint,
      zoom: 14,
    });

    view.ui.move("zoom", "bottom-right");

    // 移除powered by
    view.ui._removeComponents(["attribution"]);
  }

  getLayer(view.map, layerID);
  viewGroup[index] = view;
};

// 获取图层
const getLayer = (map, layerID) => {
  if (!layerID) {
    return false;
  }

  const layerObj = viewLayers.find((e) => e.id === layerID);
  const layer = map.findLayerById(layerID);
  if (!layer) {
    map.removeAll();

    const { id, title, url } = layerObj;

    const layer = new TileLayer({
      id,
      title,
      url,
    });

    map.add(layer);
  }
};

// 获取视图标题
const getViewTitle = (index) => {
  const layerID = viewWin[index].layer;
  const layerObj = viewLayers.find((e) => e.id === layerID);
  if(layerID){
    return `视窗【${index + 1}】-${layerObj.title ? layerObj.title : '暂无标题'}`;
  }
  return `视窗【${index + 1}】`;
};

/**
 * 变更视图图层
 *
 * @param {*} index 当前分屏下标
 */
const changeViewLayer = (index) => {
  const layerID = viewWin[index].layer;
  getLayer(viewGroup[index].map, layerID);
};

/**
 * 获取分屏宽度
 *
 * @param {*} screenNum 分屏数量
 * @param {*} index 当前分屏下标
 */
const getSplitScreenWidth = (screenNum, index) => {
  // 单独处理
  if (screenNum === 1 || screenNum === 2) {
    return `${100 / screenNum}%`;
  }

  // 双数
  if (screenNum % 2 === 0) {
    if (screenNum % 3 === 0) {
      return `${100 / (screenNum / 3)}%`;
    }
    return `${100 / (screenNum / 2)}%`;
  }
  // 单数
  else {
    // 上面一排的数量
    const topNum = (screenNum - 1) / 2;
    const bottomNum = topNum + 1;

    if (index < topNum) {
      return `${100 / topNum}%`;
    } else {
      return `${100 / bottomNum}%`;
    }
  }
};

/**
 * 获取分屏宽度
 *
 * @param {*} screenNum 分屏数量
 * @param {*} index 当前分屏下标
 */
const getSplitScreenHeight = (screenNum, index) => {
  // 单独处理
  if (screenNum === 1 || screenNum === 2) {
    return "100%";
  }

  // 双数
  else if (screenNum % 2 === 0) {
    if (screenNum % 3 === 0) {
      return `${100 / 3}%`;
    }
    return "50%";
  }
  // 单数
  else {
    return "50%";
  }
};

/**
 * 获取分屏显示样式
 *
 * @param {*} index 当前分屏下标
 */
const getSplitScreenDisplay = (index) => {
  nextTick(() => {
    initMap(index);
  });

  return index < viewVisibleNum.value ? "block" : "none";
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
.split-screen {
  .title {
    font-size: 14px;
    color: #666;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: $border;
    margin-bottom: 15px;
  }
}

.map-view {
  border: #eceef3 2px solid;
  position: relative;

  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__map {
    width: 100%;
    height: calc(100% - 26px);
  }

  &__title {
    background: #fff;
    height: 26px;
    text-align: center;
    padding: 5px;
  }
}

.split-buttons {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: $border;
    margin: 5px;
    width: 30.5%;
    height: 100px;
    flex-wrap: wrap;
    color: #888;
    overflow: hidden;

    .button {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      justify-content: center;
      position: relative;
      border: 1px solid #f8f8f8;
    }

    &:hover,
    &.is-active {
      cursor: pointer;
      border-color: $primary-color;
      z-index: 2;

      .button {
        color: $primary-color;
        border-color: $primary-color;
      }
    }
  }
}
</style>
