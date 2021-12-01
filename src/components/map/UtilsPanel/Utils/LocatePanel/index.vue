<template>
  <UtilPanel
    width="330px"
    :title="`${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
    <div class="locate-panel__content">
      <el-form label-width="55px">
        <el-form-item label="坐标系" class="mb-15">
          <el-select
            v-model="coord"
            placeholder="请选择坐标系"
            style="width: 100%"
          >
            <el-option
              v-for="item in coords"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="X坐标" class="mb-15">
          <el-input v-model="posX"></el-input>
        </el-form-item>
        <el-form-item label="Y坐标" class="mb-15">
          <el-input v-model="posY"></el-input>
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

const posX = ref(0);
const posY = ref(0);
const coord = ref(4490);

const coords = ref([
  {
    label: "2000地理坐标系（4490）",
    value: 4490,
  },
  {
    label: "2000平面坐标系_有带号（4524）",
    value: 4524,
  },
  {
    label: "2000平面坐标系_无带号（4545）",
    value: 4545,
  },
  {
    label: "WGS84地理坐标系（4326）",
    value: 4326,
  },
  {
    label: "墨卡托投影（3857）",
    value: 3857,
  },
  {
    label: "西安80坐标系（2381）",
    value: 2381,
  },
  {
    label: "北京54坐标系（2433）",
    value: 2433,
  },
]);

watch(
  () => store.getters.locateData,
  (val) => {
    posX.value = parseFloat(val.x).toFixed(5);
    posY.value = parseFloat(val.y).toFixed(5);
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
      x: posX.value,
      y: posY.value,
      wkid: coord.value,
    });
  });
};

const getLocate = () => {
  nextTick(() => {
    dispatchMapEvent("onGetLocateCoord", {
      spatialReference: { wkid: coord.value },
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
