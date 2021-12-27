<template>
  <UtilPanel
    width="300px"
    :title="`${mapViewType}${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
    <button
      class="action-button esri-icon-measure-line mr-10"
      :class="{ 'is-active': activeButton === 'distance' }"
      id="distanceButton"
      type="button"
      title="测量两点之间的距离"
      @click="
        onMeasureDistance(
          mapViewType === '2D' ? 'onMeasureDistance2D' : 'onMeasureDistance3D'
        )
      "
    ></button>
    <button
      class="action-button esri-icon-measure-area"
      :class="{ 'is-active': activeButton === 'area' }"
      id="areaButton"
      type="button"
      title="计算面积"
      @click="onMeasureArea(mapViewType === '2D' ? 'onMeasureArea2D' : 'onMeasureArea3D')"
    ></button>
  </UtilPanel>
</template>

<script setup>
import { watch } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import common from "common";
import UtilPanel from "components/common/UtilPanel/index.vue";

const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({
      utilName: "量算",
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

const { dispatchMapEvent } = common();
// 当前激活按钮
const activeButton = ref(null);
const panelID = "measurePanel";

watch(
  () => props.mapViewType,
  () => {
    // 切换2/3D视图时取消原有激活状态
    activeButton.value = null;
  }
);

// 关闭面板
const onClose = () => {
  emit("close", {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: "Measure",
    panelID,
  });
};

// 设置当前激活按钮
const setActiveButton = (val) => {
  activeButton.value = activeButton.value === val ? null : val;
};

// 测量距离
const onMeasureDistance = (eventName) => {
  setActiveButton("distance");
  dispatchMapEvent(eventName, {
    panelID,
    activeButton: activeButton.value,
  });
};

// 测量面积
const onMeasureArea = (eventName) => {
  setActiveButton("area");
  dispatchMapEvent(eventName, {
    panelID,
    activeButton: activeButton.value,
  });
};
</script>

<style lang="scss">
#measureDistance2D,
#measureArea2D,
#measureDistance3D,
#measureArea3D {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>
