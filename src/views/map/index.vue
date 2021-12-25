<template>
  <div class="map-index-container">
    <!-- 地图 -->
    <ArcGisMap
      ref="mapRef"
      :map-operate-panel="mapOperatePanel"
    ></ArcGisMap>
    <!-- 地图信息面板 -->
    <MapInfo
      v-if="mapInfoPanel"
      :fold-map-info-panel="foldMapInfoPanel"
      @click-fold="onFoldMapInfoPanel"
      @map-set-view-scale="onMapSetView"
    />
    <!-- 切换底图 -->
    <SwitchMap
      v-if="mapSwitchMap"
      :map-operate-panel="mapOperatePanel"
      @change-basemap="changeBasemap"
      @map-set-view-scale="onMapSetView"
    />
    <!-- 工具栏 -->
    <UtilsPanel
      ref="utilsPanelRef"
      v-if="mapUtilsPanel"
      @open-full-screen-window="onOpenFullscreenWindow"
    />
    <!-- 比例尺 -->
    <ScaleBar v-if="mapScaleBar" :map-bottom-coord="mapBottomCoord"/>
    <!-- 底部信息 -->
    <BottomCoord v-if="mapBottomCoord" :companyName="companyName" />
    <!-- 操作栏 -->
    <OperatePanel v-if="mapOperatePanel" />

    <!-- 账户设置 -->
    <AccountInfoPopover
      v-if="!fixedHeader"
      @on-account-setting="setAccountSettingVisible(true)"
    >
      <span class="user-avatar">
        <img :src="user.avatar ? user.avatar : defaultAvatarImg" />
      </span>
    </AccountInfoPopover>
    <AccountSetting
      :visible="accountSettingVisible"
      @close="setAccountSettingVisible(false)"
    />

    <!-- 卷帘工具 -->
    <SwipePanel
      v-if="swipePanel.visible"
      :panel="swipePanel.panel"
      :index="swipePanel.index"
      :minimize="swipePanel.minimize"
      @close="onCloseFullscreenWindow"
      @minimize="onMinimizeFullscreenWindow(swipePanel)"
      @maximize="onMaximizeFullscreenWindow(swipePanel)"
    />
    <!-- 分屏工具 -->
    <SplitScreen
      v-if="splitScreen.visible"
      :panel="splitScreen.panel"
      :index="splitScreen.index"
      :minimize="splitScreen.minimize"
      @close="onCloseFullscreenWindow"
      @minimize="onMinimizeFullscreenWindow(splitScreen)"
      @maximize="onMaximizeFullscreenWindow(splitScreen)"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref, provide } from "@vue/runtime-core";
import { useStore } from "vuex";
// 组件
import ArcGisMap from "./map.vue";
import MapInfo from "components/map/MapInfo/index.vue";
import SwitchMap from "components/map/SwitchMap/index.vue";
import UtilsPanel from "components/map/UtilsPanel/index.vue";
import OperatePanel from "components/map/OperatePanel/index.vue";
import ScaleBar from "components/map/ScaleBar/index.vue";
import BottomCoord from "components/map/BottomCoord/index.vue";
import AccountSetting from "components/user/AccountSetting/index.vue";
import AccountInfoPopover from "components/user/AccountInfoPopover/index.vue";
import SwipePanel from "components/map/SwipePanel/index.vue";
import SplitScreen from "components/map/SplitScreen/index.vue";
// 图片
import defaultAvatarImg from "assets/images/default-avatar.png";
import { ElMessage } from "element-plus";

const store = useStore();

// 当前地图视图为2D或者3D
const mapViewType = ref("3D");

// 当前地图底图类型
const basemap = ref("hybrid");

// 摄像机信息
const cameraInfo = ref({
  tilt: 45,
  heading: 44,
});

// 坐标信息
const coordInfo = reactive({
  // 会展中心坐标
  lon: 108.37586,
  lat: 22.81221,
  tilt: 0,
  heading: 0,
  scale: 50000000,
  locate: "",
});

const user = computed(() => store.getters.user);
const fixedHeader = computed(() => store.getters.fixedHeader);
const mapInfoPanel = computed(() => store.getters.mapInfoPanel);
const mapSwitchMap = computed(() => store.getters.switchMap);
const mapUtilsPanel = computed(() => store.getters.mapUtilsPanel);
const mapOperatePanel = computed(() => store.getters.mapOperatePanel);
const mapScaleBar = computed(() => store.getters.mapScaleBar);
const mapBottomCoord = computed(() => store.getters.mapBottomCoord);
const companyName = computed(() => store.getters.companyName);

// 顶级组件通过provide传递给子孙组件
provide("getMapViewType", mapViewType);
provide("getCameraInfo", cameraInfo);
provide("getCoordInfo", coordInfo);
provide("getFixedHeader", fixedHeader);
provide("getBasemap", basemap);

// 是否显示账户设置
const accountSettingVisible = ref(false);

// 地图实例
const mapRef = ref(null);

// 是否折叠地图资源面板
const foldMapInfoPanel = ref(false);

// 工具栏实例
const utilsPanelRef = ref(null);

// 卷帘工具
const swipePanel = ref({
  visible: false,
  panel: null,
  index: -1,
  minimize: false,
});

// 分屏工具
const splitScreen = ref({
  visible: false,
  panel: null,
  index: -1,
  minimize: false,
});

// 显示账户设置
const setAccountSettingVisible = (val) => {
  accountSettingVisible.value = val;
};

// 监听通过地图信息设置地图比例
const onMapSetView = ({ scale }) => {
  coordInfo.scale = scale;
  ElMessage.success(`已将地图比例调整至1:${scale}`)
  // 调用子组件方法
  mapRef.value.onSetScale(scale);
};

// 折叠地图资源面板
const onFoldMapInfoPanel = (val) => {
  foldMapInfoPanel.value = val;
};

// 改变地图底图
const changeBasemap = (val) => {
  basemap.value = val;
};

// 打开全屏窗口
const onOpenFullscreenWindow = ({ visible, panel, index }) => {
  console.log("打开全屏弹窗");

  const val = { visible, panel, index, minimize: false };

  switch (panel.component) {
    case "SwipePanel":
      swipePanel.value = val;
      break;
    case "SplitScreen":
      splitScreen.value = val;
      break;
    default:
      console.log("component is error");
  }
};

// 关闭全屏窗口
const onCloseFullscreenWindow = ({ panel, index, active }) => {
  console.log("关闭全屏弹窗");

  switch (panel.component) {
    case "SwipePanel":
      swipePanel.value.visible = false;
      break;
    case "SplitScreen":
      splitScreen.value.visible = false;
      break;
    default:
      console.log("component is error");
  }

  // 取消工具栏高亮，这里不能直接使用handleHighlightPanels方法，要先改变panelList里对应面板的utilActive属性
  utilsPanelRef.value.setPanelVisble(panel, index, active);
};

// 全屏窗口最小化
const onMinimizeFullscreenWindow = (e) => {
  console.log("全屏窗口最小化");
  e.minimize = true;
};

// 全屏窗口最大化
const onMaximizeFullscreenWindow = (e) => {
  console.log("全屏窗口最大化");
  e.minimize = false;
};
</script>

<style lang="scss" scoped>
.map-index-container {
  position: relative;
  height: 100%;
}
.user-avatar {
  position: absolute;
  cursor: pointer;
  z-index: 99;
  right: 10px;
  top: 10px;
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: $map-box-shadow;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
