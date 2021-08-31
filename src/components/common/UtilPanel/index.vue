<template>
  <div v-drag class="util-panel" :style="{ width }">
    <div class="util-panel__header drag-move">
      <span
        ><span>{{ title }}</span>
        <i
          v-if="showHelpIcon"
          class="el-icon-question ml-10"
          title="帮助说明"
          @click="onClickHelp"
        ></i
      ></span>
      <i
        v-if="showCloseIcon"
        class="el-icon-close"
        title="关闭窗口"
        @click="onClickClose"
      ></i>
    </div>
    <div :id="panelId" class="util-panel__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "@vue/runtime-core";

const props = defineProps({
  title: {
    type: String,
    default: "工具名称",
  },
  panelId: {
    type: String,
    default: "util",
  },
  width: {
    type: String,
    default: "300px",
  },
  showHelpIcon: {
    type: Boolean,
    default: true,
  },
  showCloseIcon: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-click-help", "on-click-close"]);

// 点击“说明”按钮
const onClickHelp = () => {
  emit("on-click-help");
};

// 点击“关闭”按钮
const onClickClose = () => {
  emit("on-click-close");
};
</script>

<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
</style>
