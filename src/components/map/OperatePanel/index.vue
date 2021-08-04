<template>
  <div :class="['operate-panel', mapBottomCoord ? 'has-bottom-coord' : '']">
    <compass />
    <div class="map-transform" @click="onTransform()">
      <span class="text">切换</span>
      <span>{{ mapViewType === "2D" ? "3D" : "2D" }}</span>
    </div>
    <div class="map-locate">
      <i class="iconfont icon-zoom-inbeifen" @click="onLocate()"></i>
    </div>
    <div class="map-zoom">
      <i
        class="iconfont icon-fangda"
        :class="{ 'is-disabled': coordInfo.scale <= minScale }"
        @click="onZoomIn()"
      ></i>
      <i
        class="iconfont icon-suoxiao"
        :class="{ 'is-disabled': coordInfo.scale >= maxScale }"
        @click="onZoomOut()"
      ></i>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { inject } from "@vue/runtime-core";
import common from "common";
import Compass from "./Compass.vue";

export default {
  name: "OperatePanel",

  props: {
    // 是否显示地图底部信息
    mapBottomCoord: {
      type: Boolean,
      default: true,
    },
  },

  components: { Compass },

  setup(props, { emit }) {
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
      console.log(`点击了2/3D切换按钮，当前视图是${mapViewType.value}视图`);

      emit("change-map-view-type", viewType);
      ElMessage.success(`您已成功切换${viewType}视图`);
    };

    // 定位
    const onLocate = () => {
      showDevMessage();
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

    return {
      mapViewType,
      coordInfo,
      minScale,
      maxScale,
      onTransform,
      onLocate,
      onZoomIn,
      onZoomOut,
    };
  },
};
</script>
<style lang="scss" scoped>
.operate-panel {
  position: absolute;
  bottom: 15px;
  right: 8px;

  &.has-bottom-coord {
    bottom: calc(15px + #{$bottom-height});
  }

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
