<template>
  <UtilPanel
    width="365px"
    :title="`${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
  </UtilPanel>
</template>

<script setup>
import UtilPanel from "components/common/UtilPanel/index.vue";

const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({
      utilName: "绘制",
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

// 当前面板ID
const panelID = "drawPanel";

// 关闭面板
const onClose = () => {
  emit("close", {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: "Draw",
    panelID,
  });
};
</script>

<style lang="scss">
#draw-panel{
  padding: 5px 10px;
}
</style>
