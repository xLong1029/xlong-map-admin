<template>
  <div class="map-index-container">
    <ArcGisMap
      ref="mapRef"
      :map-operate-panel="mapOperatePanel"
      @close-screenshot="onCloseScreenshot"
    ></ArcGisMap>
    <MapInfo
      v-if="mapInfoPanel"
      :fold-map-info-panel="foldMapInfoPanel"
      :map-bottom-coord="mapBottomCoord"
      @click-fold="onFoldMapInfoPanel"
      @map-set-view-scale="onMapSetView"
    />
    <!-- <ResPanel
      v-if="mapInfoPanel"
      :fold-map-info-panel="foldMapInfoPanel"
      :map-bottom-coord="mapBottomCoord"
      @click-fold="onFoldMapInfoPanel"
    /> -->
    <SwitchMap
      v-if="switchMap"
      :map-operate-panel="mapOperatePanel"
      :map-bottom-coord="mapBottomCoord"
      @change-basemap="changeBasemap"
      @map-set-view-scale="onMapSetView"
    />
    <UtilsPanel v-if="mapUtilsPanel" />
    <BottomCoord v-if="mapBottomCoord" :companyName="companyName" />
    <OperatePanel v-if="mapOperatePanel" :map-bottom-coord="mapBottomCoord" />

    <AccountInfoPopover
      v-if="!fixedHeader"
      @on-account-setting="setAccountSettingVisible(true)"
    >
      <span class="user-avatar">
        <img :src="user.avatar ? user.avatar : defaultAvatarImg" />
      </span>
    </AccountInfoPopover>
    <bottom-coord v-if="mapBottomCoord" :companyName="companyName" />
    <AccountSetting
      :visible="accountSettingVisible"
      @close="setAccountSettingVisible(false)"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref, provide } from "@vue/runtime-core";
import { useStore } from "vuex";
// 组件
import ArcGisMap from "./map.vue";
// import ResPanel from "components/map/ResPanel/index.vue";
import MapInfo from "components/map/MapInfo/index.vue";
import SwitchMap from "components/map/SwitchMap/index.vue";
import UtilsPanel from "components/map/UtilsPanel/index.vue";
import OperatePanel from "components/map/OperatePanel/index.vue";
import BottomCoord from "components/map/BottomCoord/index.vue";
import AccountSetting from "components/user/AccountSetting/index.vue";
import AccountInfoPopover from "components/user/AccountInfoPopover/index.vue";
// 图片
import defaultAvatarImg from "assets/images/default-avatar.png";

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

// 开启截图
const startScreenshot = ref(false);

const user = computed(() => store.getters.user);
const fixedHeader = computed(() => store.getters.fixedHeader);
const mapInfoPanel = computed(() => store.getters.mapInfoPanel);
const switchMap = computed(() => store.getters.switchMap);
const mapUtilsPanel = computed(() => store.getters.mapUtilsPanel);
const mapOperatePanel = computed(() => store.getters.mapOperatePanel);
const mapBottomCoord = computed(() => store.getters.mapBottomCoord);
const companyName = computed(() => store.getters.companyName);

// 顶级组件通过provide传递给子孙组件
provide("getMapViewType", mapViewType);
provide("getCameraInfo", cameraInfo);
provide("getCoordInfo", coordInfo);
provide("getFixedHeader", fixedHeader);
provide("getStartScreenshot", startScreenshot);
provide("getBasemap", basemap);

// 是否显示账户设置
const accountSettingVisible = ref(false);

// 地图实例
const mapRef = ref(null);

// 是否折叠地图资源面板
const foldMapInfoPanel = ref(false);

// 显示账户设置
const setAccountSettingVisible = (val) => {
  accountSettingVisible.value = val;
};

// 监听通过地图信息设置地图比例
const onMapSetView = ({ scale }) => {
  coordInfo.scale = scale;
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

// 关闭截图
const onCloseScreenshot = () => {
  startScreenshot.value = false;
};
</script>
<style lang="scss" scoped>
.map-index-container {
  position: relative;
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
