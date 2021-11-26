<template>
  <div class="app-setting-container">
    <h3 class="drawer-title">系统配置</h3>

    <div class="drawer-item">
      <span>主题颜色</span>
      <ThemePicker
        style="float: right; height: 26px; margin: -3px 8px 0 0"
        @change="changeSettings('theme', $event)"
      />
    </div>

    <div class="drawer-item">
      <span>显示系统固定头部</span>
      <el-switch v-model="fixedHeader" class="drawer-switch" />
    </div>

    <template v-if="showMapSetting">
      <h3 class="drawer-title mt-20">地图配置</h3>

      <div class="drawer-item">
        <span>地图信息</span>
        <el-switch v-model="mapInfoPanel" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>切换底图</span>
        <el-switch v-model="switchMap" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>工具面板</span>
        <el-switch v-model="mapUtilsPanel" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>操作面板(放大、缩小)</span>
        <el-switch v-model="mapOperatePanel" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>底部信息</span>
        <el-switch v-model="mapBottomCoord" class="drawer-switch" />
      </div>

      <div class="drawer-button mt-20">
        <el-button round @click="resetSetting">重置配置</el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import ThemePicker from "components/common/ThemePicker/index.vue";
import { computed, ref, watch, onMounted } from "@vue/runtime-core";
import common from "common";

const { store, router, changeSettings } = common();

const showMapSetting = ref(true);

onMounted(() => {
  showMapSetting.value = router.currentRoute.value.name === "Map";
})

const fixedHeader = computed({
  get() {
    return store.getters.fixedHeader;
  },
  set(val) {
    changeSettings("fixedHeader", val);
  },
});

const mapInfoPanel = computed({
  get() {
    return store.getters.mapInfoPanel;
  },
  set(val) {
    changeSettings("mapInfoPanel", val);
  },
});

const mapUtilsPanel = computed({
  get() {
    return store.getters.mapUtilsPanel;
  },
  set(val) {
    changeSettings("mapUtilsPanel", val);
  },
});

const mapOperatePanel = computed({
  get() {
    return store.getters.mapOperatePanel;
  },
  set(val) {
    changeSettings("mapOperatePanel", val);
  },
});

const switchMap = computed({
  get() {
    return store.getters.switchMap;
  },
  set(val) {
    changeSettings("switchMap", val);
  },
});

const mapBottomCoord = computed({
  get() {
    return store.getters.mapBottomCoord;
  },
  set(val) {
    changeSettings("mapBottomCoord", val);
  },
});

watch(
  () => router.currentRoute.value,
  (route) => {
    showMapSetting.value = route.name === "Map";
  }
);

const resetSetting = () => {
  store.dispatch("settings/resetSetting");
};
</script>

<style lang="scss" scoped>
.app-setting-container {
  padding: 20px;
}

.drawer {
  &-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  &-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    line-height: 22px;
  }

  &-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  &-switch {
    float: right;
  }

  &-button {
    text-align: center;
  }
}
</style>
