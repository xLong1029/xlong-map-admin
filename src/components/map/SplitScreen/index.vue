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
                  :class="splitButton.active ? 'active' : ''"
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
                    <!-- 双数 -->
                    <!-- <div
                      v-if="(i + 1) % 2 === 0"
                      class="button"
                      :style="{
                        width: `${(i + 1) % 3 === 0 ? '33.33%' : '50%'}`,
                        height: `${i + 1 === 2 ? '100%' : '50%'}`,
                      }"
                    >
                      {{ j + 1 }}
                    </div> -->
                    <!-- 单数 -->
                    <!-- <div
                      v-else
                      class="button odd"
                      :style="{
                        width: `${(i + 1) % 3 === 0 ? '50%' : '33.33%'}`,
                        height: i + 1 > 1 ? '50%' : '100%',
                      }"
                    >
                      {{ j + 1 }}
                    </div> -->
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template #right>
          <!-- <div :id="mapID" :class="{ 'show-header': fixedHeader }"></div> -->
          <div
            ref="mapView"
            v-for="(item, index) in viewCount"
            :key="'map-view' + index"
            :id="`splitScreenMapView${index + 1}`"
            class="map-view"
            :style="getStyle(index + 1)"
          >
            <div class="map-view__map" v-show="viewVisibleNum >= index"></div>
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
import { ref, reactive, defineProps, defineEmits, inject } from "@vue/runtime-core";
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

// 地图ID
const mapID = "splitScreen0";
let splitScreenView = null;
// 地图视图
const viewCount = ref(new Array(6).fill(0));
const viewLayer = ref([]);
const viewVisibleNum = ref(6);
const viewWinOne = ref(true);
const viewWinTwo = ref(false);
const viewWinThree = ref(false);
const viewWinFour = ref(false);
const viewWinFive = ref(false);
const viewWinSix = ref(false);

// 分屏按钮
const splitButtons = reactive(new Array(6).fill({ active: false }));

// 是否第一次加载
let firstLoad = true;

const changeBg = (index) => {
  if (treeRealSelect.value.length > 0) {
    splitButtons.forEach((item) => (item.active = false));
    splitButtons[index].active = true;
  }
};
const getStyle = (index) => {
  // console.log(index);

  // if (index >= viewLayer.value.length + 1 && index != 1) {
  //   return "dispay:none";
  // }

  // // 没有要显示图层时，第一个地图的图层清空
  // if (viewLayer.value.length == 0) {
  //   removeLayer(0);
  // }

  initMap(index);

  // if (firstLoad) {
  //   firstLoad = false;
  //     loadMapView(index - 1);
  // } else {
  //   loadMapView(index - 1);
  // }
};

// 清除图层
const removeLayer = (index) => {
  // let view = viewGroup[index];
  // if (view) {
  //   view.map.removeAll();
  // }
};

// 初始化地图
const initMap = (index) => {
  console.log(index);
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

    if(index < topNum){
      return `${100/ topNum}%`
    }
    else{
      return `${100/ bottomNum}%`
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
// #splitScreen {
//   width: 100%;
//   height: 100%;
// }

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
    // border-radius: 4px;
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
      border: $border;

      // &.odd {
      //   &:nth-child(2n + 1) {
      //     &::before {
      //       border-left: none;
      //     }
      //   }
      // }

      // &:first-child {
      //   &::before {
      //     border-left: none;
      //   }
      //   &::after {
      //     border-left: none;
      //   }
      // }

      // // &:last-child{}

      // &::before {
      //   content: "";
      //   display: block;
      //   position: absolute;
      //   height: 100%;
      //   left: -1px;
      //   border-left: $border;
      // }

      // &::after {
      //   content: "";
      //   display: block;
      //   position: absolute;
      //   width: 100%;
      //   bottom: -1px;
      //   border-bottom: $border;
      // }
    }

    &:hover {
      cursor: pointer;
      border-color: $primary-color;
      z-index: 2;

      .button {
        color: $primary-color;
        border-color: $primary-color;

        &::before {
          border-color: $primary-color;
        }

        &::after {
          border-color: $primary-color;
        }
      }
    }
  }
}
</style>
