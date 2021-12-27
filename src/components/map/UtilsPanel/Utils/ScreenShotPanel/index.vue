<template>
  <UtilPanel
    width="205px"
    :title="`${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
    <p v-if="startScreenshot" style="margin: 5px 0">通过单击地图以建立您的截图</p>
    <button
      v-else
      class="esri-button esri-button--primary"
      type="button"
      @click="onStartScreenshot"
    >
      开始截图
    </button>
  </UtilPanel>
</template>

<script setup>
import common from "common";
import { computed } from "@vue/runtime-core";
import UtilPanel from "components/common/UtilPanel/index.vue";

const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({
      utilName: "截图",
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

const { store, dispatchMapEvent } = common();

// // 获取顶级组件传递的值：是否开启截图
const startScreenshot = computed(() => store.getters.startScreenshot);

// 当前面板ID
const panelID = "screenshotPanel";

// 关闭面板
const onClose = () => {
  emit("close", {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: "ScreenShot",
    panelID,
  });
};

// 开启截图
const onStartScreenshot = () => {
  store.dispatch("map/setStartScreenshot", true);
  dispatchMapEvent("onScreenShot");
};
</script>
<style lang="scss">
#screenshotPanel {
  padding: 10px;
}
</style>
