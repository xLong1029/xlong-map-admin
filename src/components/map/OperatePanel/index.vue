<template>
  <div class="operate-panel">
    <Compass v-if="showCompassBtn" />
    <div v-if="showTransformBtn" class="map-transform" @click="onTransform()"  title="2/3D切换">
      <span class="text">切换</span>
      <span>{{ mapViewType === "2D" ? "3D" : "2D" }}</span>
    </div>
    <div v-if="showLocateBtn" class="map-locate">
      <i class="iconfont icon-zoom-inbeifen" @click="onLocate()" title="定位"></i>
    </div>
    <div v-if="showZoomInBtn || showZoomOutBtn" class="map-zoom">
      <i
        v-if="showZoomInBtn"
        class="iconfont icon-fangda"
        :class="{ 'is-disabled': coordInfo.scale <= minScale }"
        title="放大"
        @click="onZoomIn()"
      ></i>
      <i
        v-if="showZoomOutBtn"
        class="iconfont icon-suoxiao"
        :class="{ 'is-disabled': coordInfo.scale >= maxScale }"
        title="缩小"
        @click="onZoomOut()"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import common from "common";
import Compass from "./Compass.vue";

const props = defineProps({
  showCompassBtn: {
    type: Boolean,
    default: true,
  },
  showTransformBtn: {
    type: Boolean,
    default: true,
  },
  showLocateBtn: {
    type: Boolean,
    default: true,
  },
  showZoomOutBtn: {
    type: Boolean,
    default: true,
  },
  showZoomInBtn: {
    type: Boolean,
    default: true,
  },
  showZoomOutBtn: {
    type: Boolean,
    default: true,
  },
});

const { dispatchMapEvent, showDevMessage } = common();

// 获取顶级组件传递的值：当前地图视图是2D或者3D
const mapViewType = inject("getMapViewType");
// 坐标信息
const coordInfo = inject("getCoordInfo");

const maxScale = 30000;
const minScale = 1500;

// 2/3D转换
const onTransform = () => {
  const viewType = mapViewType.value === "3D" ? "2D" : "3D";
  console.log(`点击了2/3D切换按钮，即将转换至${viewType}视图`);
  dispatchMapEvent("onTransformView", {
    viewType,
  });
};

// 定位
const onLocate = () => {
  dispatchMapEvent("onLocate", null);
};

// 放大
const onZoomIn = () => {
  if (coordInfo.scale <= minScale) {
    return false;
  }

  dispatchMapEvent("onZoomIn", null);
};

// 缩小
const onZoomOut = () => {
  if (coordInfo.scale >= maxScale) {
    return false;
  }

  dispatchMapEvent("onZoomOut", null);
};
</script>

<style lang="scss" scoped>
.operate-panel {
  position: absolute;
  bottom: 10px;
  right: 8px;

  .iconfont {
    font-size: 24px;
  }

  .map {
    &-transform,
    &-locate,
    &-zoom {
      margin-top: 8px;
      width: 36px;
      margin-left: 8px;
      background: #fff;
      border-radius: $map-border-radius;
      box-shadow: $map-box-shadow;
    }

    &-transform {
      font-weight: bold;

      .text {
        font-size: 12px;
      }
    }

    &-transform,
    &-locate {
      padding: 5px;
      text-align: center;
      cursor: pointer;
    }

    &-zoom {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px 6px;

      .iconfont {
        padding: 2px 0;
        cursor: pointer;

        &.is-disabled {
          cursor: not-allowed;
          color: #c7c7c7;
        }
      }

      .icon-suoxiao {
        border-top: 1px dashed #eee;
      }
    }
  }
}
</style>
