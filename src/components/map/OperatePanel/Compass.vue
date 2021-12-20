<template>
  <div class="compass-container">
    <span
      ref="compassRef"
      class="pointer"
      :class="{ 'is-disabled': mapViewType === '2D' }"
      title="恢复正北方向"
      @click="onReset"
    ></span>
    <span
      class="arrow-left"
      :class="{ 'is-disabled': mapViewType === '2D' }"
      title="逆时针转动45°"
      @click="onRotate(-1)"
    ></span>
    <span
      class="arrow-right"
      :class="{ 'is-disabled': mapViewType === '2D' }"
      title="顺时针转动45°"
      @click="onRotate(1)"
    ></span>
  </div>
</template>

<script setup>
import common from "common";
import { inject, watch } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

const { dispatchMapEvent } = common();
// 当前地图视图为2D或者3D
const mapViewType = inject("getMapViewType");
// 摄像机信息
const cameraInfo = inject("getCameraInfo");
// 罗盘实例
const compassRef = ref("");
// 指针旋转角度
const angle = ref(0);

// 监听指针信息改变
watch(
  () => cameraInfo.value,
  ({ tilt, heading }) => {
    angle.value = -heading;
    setCompassStyles(angle.value, "0s");
  }
);

// 监听地图视图改变
watch(
  () => mapViewType.value,
  (val) => {
    // 2D视图
    if (val === "2D") {
      angle.value = 0;
      setCompassStyles(angle.value, "0s");
    }
  }
);

// 指针复位
const onReset = () => {
  if (mapViewType.value === "2D") {
    return false;
  }

  angle.value = Math.abs(angle.value) > 180 ? 360 : 0;

  setCompassStyles(angle.value);
  dispatchMapEvent("onRotate", { angle: 0 });
};

/**
 * 旋转
 *
 * @param {*} direction 旋转方向 1 顺时针 -1 逆时针
 */
const onRotate = (direction) => {
  if (mapViewType.value === "2D") {
    return false;
  }

  angle.value = direction > 0 ? angle.value + 45 : angle.value - 45;

  setCompassStyles(angle.value);
  dispatchMapEvent("onRotate", { angle: angle.value });
};

/**
 * 设置指针样式
 * @param {*} angle 旋转角度
 * @param {*} duration 动画持续时间
 */
const setCompassStyles = (angle, duration = "0.2s") => {
  const transform = `rotateZ(${angle}deg)`;

  const compass = compassRef.value;
  compass.style["transition-duration"] = duration;
  compass.style["transform"] = transform;
  compass.style["-webkit-transform"] = transform;
  compass.style["-moz-transform"] = transform;
};
</script>
<style lang="scss" scoped>
.compass-container {
  background: url("./../../../assets/images/compass-bg.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: $map-box-shadow;
  width: 52px;
  height: 52px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;

  .compass {
    width: 100%;
    display: block;
  }

  .pointer,
  .arrow-left,
  .arrow-right {
    &.is-disabled {
      cursor: not-allowed;
    }
  }

  .pointer {
    position: absolute;
    z-index: 99;
    top: 10px;
    color: #717171;
    width: 12px;
    height: 34px;
    left: 20px;
    background: url("./../../../assets/images/pointer.png") no-repeat;
    background-size: 100% 100%;
  }

  .arrow {
    &-left,
    &-right {
      position: absolute;
      z-index: 99;
      top: 13px;
      font-size: 24px;
      color: #717171;
      cursor: pointer;
      width: 8px;
      height: 28px;
      image-rendering: -moz-smooth; /* Firefox */
      image-rendering: -o-smooth; /* Opera */
      image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
      image-rendering: smooth;
      // -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
    }

    &-left {
      left: 3.5px;
      background: url("./../../../assets/images/arrow-left.png") no-repeat;
      background-size: 100% 100%;

      &.is-disabled {
        &:hover {
          background: url("./../../../assets/images/arrow-left.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      &:hover {
        background: url("./../../../assets/images/arrow-left-active.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }

    &-right {
      right: 3px;
      background: url("./../../../assets/images/arrow-right.png") no-repeat;
      background-size: 100% 100%;

      &.is-disabled {
        &:hover {
          background: url("./../../../assets/images/arrow-right.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      &:hover {
        background: url("./../../../assets/images/arrow-right-active.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
