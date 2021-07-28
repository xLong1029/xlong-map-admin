<template>
  <div :class="['operate-panel', mapBottomCoord ? 'has-bottom-coord' : '']">
    <compass />
    <div class="map-transform">
      <i
        class="iconfont"
        :class="mapViewType === '2D' ? 'icon-a-2-3d' : 'icon-a-3-2d'"
        @click="onTransform()"
      ></i>
    </div>
    <div class="map-locate">
      <i class="iconfont icon-zoom-inbeifen" @click="onLocate"></i>
    </div>
    <div class="map-zoom">
      <i
        class="iconfont icon-fangda"
        :class="coordInfo.scale <= 1500 ? 'is-disabled' : ''"
        @click="onZoomIn()"
      ></i>
      <i
        class="iconfont icon-suoxiao"
        :class="coordInfo.scale >= 33000000 ? 'is-disabled' : ''"
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
      if (coordInfo.scale <= 1500) {
        return false;
      }

      dispatchMapEvent("onZoomIn", null);
    };

    // 缩小
    const onZoomOut = () => {
      if (coordInfo.scale >= 33000000) {
        return false;
      }

      dispatchMapEvent("onZoomOut", null);
    };

    return { mapViewType, coordInfo, onTransform, onLocate, onZoomIn, onZoomOut };
  },
};
</script>
<style lang="scss" scoped>
.operate-panel {
  position: absolute;
  bottom: 10px;
  right: 8px;

  &.has-bottom-coord {
    bottom: calc(10px + #{$bottom-height});
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
