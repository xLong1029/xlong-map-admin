<template>
  <div v-drag class="util-panel minimize-panel">
    <div class="util-panel__header drag-move">
      <span>{{ title }}</span>
      <span>
        <i
          class="iconfont icon-zuidahua mr-10"
          title="窗口最大化"
          @click="onMaximize"
        ></i>
        <i class="el-icon-close" title="关闭窗口" @click="onClose"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "@vue/runtime-core";
const props = defineProps({
  // 面板
  title: {
    type: String,
    default: "面板名称",
  },
});

const emit = defineEmits(["close", "maximize"]);

// 关闭面板
const onClose = () => {
  emit("close");
};

// 最大化
const onMaximize = () => {
  emit("maximize");
};
</script>

<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.minimize-panel {
  width: 260px;
  top: 63px;
  right: 15px;
}
</style>
