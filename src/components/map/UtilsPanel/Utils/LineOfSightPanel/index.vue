<template>
  <UtilPanel
    width="260px"
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
      utilName: "视线",
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
const panelID = "lineOfSightPanel";

// 关闭面板
const onClose = () => {
  emit("close", {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: "LineOfSight",
    panelID,
  });
};
</script>

<style lang="scss">
#lineOfSightPanel {
  padding: 10px;
}
</style>
