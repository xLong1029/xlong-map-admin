<template>
  <UtilPanel
    width="330px"
    :title="`${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
    <div class="locate-panel__content">
      <el-form label-width="50px">
        <el-form-item label="经度" class="mb-15">
          <el-input v-model="posLon"></el-input>
        </el-form-item>
        <el-form-item label="纬度" class="mb-15">
          <el-input v-model="posLat"></el-input>
        </el-form-item>
        <el-form-item class="button-container mb-0">
          <el-button type="primary" @click="locateTo">定位到该点</el-button>
          <el-button type="primary" @click="getLocate">从图上拾取</el-button>
        </el-form-item>
      </el-form>
    </div>
  </UtilPanel>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  nextTick,
  computed,
  watch,
} from "@vue/runtime-core";
import UtilPanel from "components/common/UtilPanel/index.vue";
import common from "common";

const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({
      utilName: "日照",
    }),
  },
  // 当前面板索引在panelList中的索引
  index: {
    type: Number,
    default: 0,
  },
  mapViewType: {
    type: String,
    default: "3D",
  },
});

const emit = defineEmits(["close"]);

const { dispatchMapEvent, store } = common();

const locateData = computed(() => store.getters.locateData);

// 当前面板ID
const panelID = "locatePanel";

const posLon = ref(0);
const posLat = ref(0);

watch(
  () => store.getters.locateData,
  (val) => {
    posLon.value = parseFloat(val.lon).toFixed(5);
    posLat.value = parseFloat(val.lat).toFixed(5);
  }
);

// 关闭面板
const onClose = () => {
  emit("close", {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: "Locate",
    panelID,
  });
};

const locateTo = () => {
  nextTick(() => {
    dispatchMapEvent("onLocateToCoordAndMarket", {
      title: "",
      lon: posLon.value,
      lat: posLat.value,
    });
  });
};

const getLocate = () => {
  nextTick(() => {
    dispatchMapEvent("onGetLocateCoord", {
      store,
    });
  });
};
</script>

<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.locate-panel {
  &__content {
    padding: 10px;
    .button-container {
      :deep(.el-form-item__content) {
        display: flex;
        justify-content: space-between;
      }

      // :deep(.el-button--mini){
      //   min-height: 32px;
      // }
    }
  }
}
</style>
