<template>
  <div class="collapse-panel">
    <!-- 右侧地图 -->
    <div
      class="collapse-panel__right"
      :class="{ 'show-left': leftPanelVisible }"
    >
      <slot name="right"></slot>
    </div>
    <!-- 左侧面板 -->
    <div
      class="collapse-panel__left"
      :class="{ 'hide-left': !leftPanelVisible }"
    >
      <div class="collapse-panel__left-content">
        <slot name="left"></slot>
      </div>
      <!-- 折叠按钮 -->
      <div class="fold-btn" @click="leftPanelVisible = !leftPanelVisible">
        <div v-html="leftPanelVisible ? '收<br/>起' : '展<br/>开'"></div>
        <i
          class="mt-5"
          :class="
            leftPanelVisible ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
          "
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
const leftPanelVisible = ref(true);
</script>

<style lang="scss" scoped>
$left-panel-width: 400px;

.collapse-panel {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.transition {
  transition: left 0.5s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.fixed-div {
  // position: fixed;
  position: absolute;
  @extend .full-height;
  @extend .transition;
}

.collapse-panel {
  &.show-header {
    .collapse-panel__left,
    .collapse-panel__right {
      height: calc(100vh - #{$header-height});
    }
  }

  &__left {
    background: #fff;
    width: $left-panel-width;
    left: 0;
    // box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.08);
    
    @extend .transition;
    @extend .fixed-div;

    &.hide-left {
      left: -$left-panel-width;
      box-shadow: none;
    }

    &-content {
      width: 100%;
      max-height: 100%;
      padding: 10px;
      overflow-y: auto;

      :deep(.layer-filter-wrapper) {
        padding: 0;
      }
    }

    .fold-btn {
      cursor: pointer;
      position: absolute;
      z-index: 1999;
      right: -30px;
      top: 50%;
      margin-top: -40px;
      width: 30px;
      height: 80px;
      background: #fff;
      border-radius: 0 4px 4px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.08);
      color: #666;
      padding: 10px 0;

      &:hover {
        color: $primary-color;
      }
    }
  }

  &__right {
    background: #f3f3f3;
    // width: 100%;
    left: 0;
    right: 0;
    @extend .fixed-div;
    @extend .transition;

    &.show-left {
      left: $left-panel-width;
    }
  }
}
</style>
