<template>
  <div v-drag class="util-panel" :style="{ width, top, right }">
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
      <span>
        <i
          v-if="showMaxIcon"
          class="iconfont icon-zuidahua mr-10"
          title="窗口最大化"
          @click="onClickMax"
        ></i>
        <i
          v-if="showCloseIcon"
          class="el-icon-close"
          title="关闭窗口"
          @click="onClickClose"
        ></i>
      </span>
    </div>
    <div v-if="showContent" :id="panelId" class="util-panel__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
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
  // 初始位置top
  top: {
    type: String,
    default: "48px",
  },
  // 初始位置right
  right: {
    type: String,
    default: "0",
  },
  // 是否显示“帮助”按钮
  showHelpIcon: {
    type: Boolean,
    default: true,
  },
  // 是否显示“关闭”按钮
  showCloseIcon: {
    type: Boolean,
    default: true,
  },
  // 是否显示“窗口最大化”按钮
  showMaxIcon: {
    type: Boolean,
    default: false,
  },
  // 是否显示工具内容
  showContent: {
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

// 点击“窗口最大化”按钮
const onClickMax = () => {
  emit("on-click-max");
};
</script>

<style lang="scss" scoped>
.util-panel {
  position: absolute;
  top: 48px;
  right: 0;
  background: #fff;
  overflow: hidden;
  border-radius: $map-border-radius;
  box-shadow: $map-box-shadow;
  z-index: 10;

  &__header {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #eceef3;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-icon-question,
    .el-icon-close,
    .icon-zuidahua {
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }

    .el-icon-question {
      font-size: 16px;
      color: #555555;
    }

    .el-icon-close {
      font-size: 20px;
    }
  }

  &__content {
    padding: 10px;

    :deep(.action-button) {
      font-size: 16px;
      background-color: transparent;
      border: $border;
      color: #6e6e6e;
      height: 32px;
      width: 32px;
      text-align: center;
      outline: none;
      border-radius: 4px;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        color: $primary-color;
        border-color: $primary-color;
      }

      &.is-active {
        background: $primary-color;
        color: #e4e4e4;
        border-color: $primary-color;
      }
    }
  }
}
</style>
