<template>
  <div
    :class="[
      'max-screen-panel',
      minimize ? 'minimize' : 'maximize',
      fixedHeader ? 'show-header' : '',
    ]"
  >
    <!-- 头部 -->
    <div class="max-screen-panel__header">
      <div class="max-screen-panel__title">
        <i class="mr-10" :class="iconClassStyles"></i>
        <span>{{ title }}</span>
      </div>
      <div class="max-screen-panel__btn">
        <i
          class="el-icon-minus mr-10"
          title="窗口最小化"
          @click="onMinimize"
        ></i>
        <i class="el-icon-close" title="关闭面板" @click="onClose"></i>
      </div>
    </div>
    <!-- 内容 -->
    <div class="max-screen-panel__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "面板名称",
  },
  iconClassStyles: {
    type: String,
    default: "el-icon-s-tools",
  },
  // 是否最小化
  minimize: {
    type: Boolean,
    default: false,
  },
  // 是否显示固定头部
  fixedHeader: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "minimize"]);

// 关闭面板
const onClose = () => {
  emit("close");
};

// 最小化
const onMinimize = () => {
  emit("minimize");
};
</script>

<style lang="scss" scoped>
$max-screen-pane-height: 30px;
$max-screen-pane-padding: 10px;

.max-screen-panel {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #eceef3;
  padding: 0 $max-screen-pane-padding $max-screen-pane-padding
    $max-screen-pane-padding;
  top: 0;
  left: 0;
  right: 0;

  &.maximize {
    display: block;
    z-index: 99;
  }

  &.minimize {
    display: none;
    z-index: -99;
  }

  &.show-header {
    height: calc(100vh - #{$header-height});
    top: #{$header-height};

    .max-screen-panel__content {
      height: calc(
        100vh - #{$max-screen-pane-height} - #{$max-screen-pane-padding} - #{$header-height}
      );
    }
  }

  &__header {
    background: #eceef3;
    height: $max-screen-pane-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    background: #fff;
    width: 100%;
    height: calc(100vh - #{$max-screen-pane-height} - #{$max-screen-pane-padding});
  }

  &__title {
    color: #535353;
    display: flex;
    align-items: center;
  }

  &__btn {
    i {
      padding: 5px;
      cursor: pointer;
      font-size: 20px;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
