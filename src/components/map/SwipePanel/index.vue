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
          <div>
            <div class="title">卷帘设置</div>
            <div class="swipe-panel-setting" style="margin-top: -10px">
              <el-form label-width="70px">
                <el-form-item label="启用卷帘" class="mb-15">
                  <el-switch v-model="openSwipe" size="mini"> </el-switch>
                </el-form-item>
                <el-form-item label="卷帘方向">
                  <el-radio-group v-model="swipeDirection" @change="onChangeSwipeType">
                    <el-radio label="horizontal">水平</el-radio>
                    <el-radio label="vertical">垂直</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div>
            <div class="title">图层资源</div>
            <el-alert
              class="mb-20"
              title="这里只做简单的演示功能，用的是AecGis服务图层"
              type="info"
              show-icon
            >
            </el-alert>
            <LayerTransfer
              v-model:un-select-values="transferUnSelectValues"
              v-model:select-values="transferSelectValues"
              :data="transferLayers"
              :titles="transferTitles"
              :props="{
                key: 'id',
                label: 'title',
              }"
              @change="onChangeLayer"
              @sort-top="onLayerOrder"
              @sort-bottom="onLayerOrder"
              @set-layer-visible="onSetLayerVisble"
            />
          </div>
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
  inject,
  onMounted,
  watch,
} from "@vue/runtime-core";
// Arcgis
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import TileLayer from "@arcgis/core/layers/TileLayer";
// 组件
import MaxScreenPanel from "components/common/MaxScreenPanel/index.vue";
import UtilPanel from "components/common/UtilPanel/index.vue";
import CollapsePanel from "components/common/CollapsePanel/index.vue";
import LayerTransfer from "./LayerTransfer/index.vue";
// 通用模块
import maxScreenPanel from "common/maxScreenPanel.js";
// 地图事件
import mapEvents from "common/mapEvents/index.js";
// 地图
import map from "common/map/index.js";
import Swipe from "@arcgis/core/widgets/Swipe";

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

const { mapCenterPoint } = map();

// 是否显示系统固定头部
const fixedHeader = inject("getFixedHeader");

let swipeMapView = null;
// 地图ID
const mapID = "swipeMap";

// 穿梭框配置
const transferUnSelectValues = ref([]);
const transferSelectValues = ref(["ChinaOnlineCommunity"]);
const transferLayers = ref([
  {
    id: "ChinaBoundaryLine",
    title: "中国边界线",
    url:
      "http://map.geoq.cn/arcgis/rest/services/SimpleFeature/ChinaBoundaryLine/MapServer",
  },
  {
    id: "ChinaOnlineStreetPurplishBlue",
    title: "蓝黑色中文不含兴趣点版中国基础地图",
    url:
      "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
  },
  {
    id: "ChinaOnlineCommunity",
    title: "彩色中文含兴趣点版中国基础地图",
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer",
  },
]);
const transferTitles = ref(["上方", "下方"]);

// 卷帘配置
const swipeDirection = ref("horizontal");

const openSwipe = ref(false);

// 监听卷帘开启/禁用变化
watch(
  () => openSwipe.value,
  (val) => {
    if (swipeMapView) {
      const eventName = val ? "onOpenSwipe" : "onRemoveSwipe";
      mapEvents()[eventName](swipeMapView, handleSwipeData());
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
  transferUnSelectValues.value = [];
  transferLayers.value.forEach((e) => {
    if (transferSelectValues.value.indexOf(e.id) < 0) {
      transferUnSelectValues.value.push(e.id);
    }
  });

  let map = new Map({
    basemap: "satellite",
  });

  // 加载图层
  transferLayers.value.forEach((e) => {
    const { id, title, url } = e;
    const layer = new TileLayer({
      id,
      title,
      url,
    });
    map.add(layer);
  });

  let view = new MapView({
    map,
    container: mapID,
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
      zoom: 11,
    },
    params: { duration: 3000 },
  });

  swipeMapView = view;

  openSwipe.value = true;
  onLayerOrder();
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

  if (openSwipe.value) {
    mapEvents()["onChangeSwipeDirection"](swipeMapView, {
      direction: val,
    });
  }
};

// 处理卷帘数据
const handleSwipeData = () => {
  let data = {
    direction: swipeDirection.value,
    leadingLayers: [],
    trailingLayers: [],
  };

  console.log(transferSelectValues.value, transferUnSelectValues.value);

  transferLayers.value.forEach((e) => {
    const { id } = e;
    const layer = swipeMapView.map.findLayerById(id);
    if (layer) {
      if (transferUnSelectValues.value.indexOf(id) >= 0) {
        data.leadingLayers.push(layer);
      } else if (transferSelectValues.value.indexOf(id) >= 0) {
        data.trailingLayers.push(layer);
      }
    }
  });

  return data;
};

// 改变图层
const onChangeLayer = () => {
  if (openSwipe.value) {
    mapEvents()["onChangeSwipeLayer"](swipeMapView, handleSwipeData());
    onLayerOrder();
  }
};

// 排序
const onLayerOrder = () => {
  if (openSwipe.value) {
    // 反向排序
    const layerIds = [
      ...transferUnSelectValues.value.reverse(),
      ...transferSelectValues.value.reverse(),
    ];

    mapEvents()["onLayerOrder"](swipeMapView, { layerIds });
  }
};

// 设置图层可见性
const onSetLayerVisble = ({ id }, visible) => {
  mapEvents()["setLayerVisible"](swipeMapView, { id, visible });
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

.swipe-panel {
  .title {
    font-size: 14px;
    color: #666;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: $border;
    margin-bottom: 15px;
  }
}

.swipe-way {
  display: flex;
  align-items: center;
}

.layer-transfer {
  :deep(.el-transfer) {
    display: flex;
  }

  :deep(.el-transfer-panel__header) {
    .el-checkbox {
      display: flex;
      align-items: center;
    }

    .el-checkbox__label {
      font-size: 14px;

      span {
        top: 14px;
      }
    }
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
}

.layer-res {
  &-top,
  &-bottom {
    height: 240px;
    border: $border;
    border-radius: 4px;
  }

  &-operate {
    margin: 10px 0;
    text-align: center;
  }

  &__title {
    background: #f5f7fa;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .check-num {
      font-size: 12px;
    }
  }

  &-item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      max-width: 200px;
    }
  }
}
</style>
