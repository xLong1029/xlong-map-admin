<template>
  <!-- 窗口最大化 -->
  <max-screen-panel
    v-if="!minimize"
    :title="`${panel.utilName}工具`"
    :icon-class-styles="panel.classStyles"
    :minimize="minimize"
    :fixed-header="fixedHeader"
    @minimize="onMinimize"
    @close="onClose"
    class="swipe-panel"
  >
    <template v-slot:content
      ><div class="slipt-screen-content">功能建设中，敬请期待...</div></template
    >
  </max-screen-panel>
  <!-- 窗口最小化 -->
  <UtilPanel
    v-else
    width="260px"
    top="63px"
    right="15px"
    :title="`${panel.utilName}分析工具`"
    :show-help-icon="false"
    :show-max-icon="true"
    :show-content="false"
    @on-click-close="onClose"
    @on-click-max="onMaximize"
  >
  </UtilPanel>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "@vue/runtime-core";
import MaxScreenPanel from "components/common/MaxScreenPanel/index.vue";
import UtilPanel from "components/common/UtilPanel/index.vue";
import maxScreenPanel from "common/maxScreenPanel.js";

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

const fixedHeader = inject("getFixedHeader");

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
.slipt-screen-content {
  padding: 10px;
}
</style>