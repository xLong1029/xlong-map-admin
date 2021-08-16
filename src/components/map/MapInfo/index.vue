<template>
  <div :class="['map-info-panel', foldMapInfoPanel ? 'fold' : 'unfold']">
    <div class="map-info-panel__title" @click="setContentVisible(!foldMapInfoPanel)">
      <div><i class="iconfont icon-tucengxuanze mr-10"></i><span>地图联动信息</span></div>
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      v-if="!foldMapInfoPanel"
      class="map-info-panel__content"
      :class="{ 'show-header': fixedHeader, 'has-bottom-coord': mapBottomCoord }"
    >
      <div class="title">
        当前视图<span class="normal ml-10"
          ><el-tag size="small">{{ mapViewType }}视图</el-tag></span
        >
      </div>
      <div class="title">鼠标位置</div>
      <div class="content">
        <span v-if="coordInfo.lon">经度：{{ coordInfo.lon }}</span>
        <span v-if="coordInfo.lat">，纬度：{{ coordInfo.lat }}</span>
        <span v-if="coordInfo.locate">当前鼠标坐落：{{ coordInfo.locate }}</span>
      </div>
      <div class="title">视图方位</div>
      <div class="content">
        <span v-if="coordInfo.tilt">视角倾斜：{{ coordInfo.tilt }}°</span>
        <span v-if="coordInfo.heading"> , 罗盘方位：{{ coordInfo.heading }}°</span>
      </div>
      <div class="title">
        <span v-if="coordInfo.scale">地图比例 <span class="normal">1:{{ coordInfo.scale }}</span></span>
      </div>
      <div class="content scle-content">
        <el-button type="primary" size="mini" @click="setScale(1500)"
          >以最佳比例1:1500显示</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";

export default {
  name: "MapInfo",

  props: {
    // 是否折叠地图联动信息面板
    foldMapInfoPanel: {
      type: Boolean,
      default: false,
    },
    // 是否显示地图底部信息
    mapBottomCoord: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    // 是否显示系统固定头部
    const fixedHeader = inject("getFixedHeader");
    // 当前视图类型
    const mapViewType = inject("getMapViewType");
    // 坐标信息
    const coordInfo = inject("getCoordInfo");

    // 收起面板
    const setContentVisible = (val) => {
      emit("click-fold", val);
    };

    // 设置当前比例
    const setScale = (scale) => {
      emit("map-set-view-scale", { scale: Math.round(scale) });
    };

    return {
      fixedHeader,
      mapViewType,
      coordInfo,
      setContentVisible,
      setScale,
    };
  },
};
</script>
<style lang="scss" scoped>
.map-info-panel {
  position: absolute;
  z-index: 99;
  top: 15px;
  left: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  width: 280px;

  overflow: hidden;
  box-shadow: $map-box-shadow;

  &.fold {
    width: 150px;

    .el-icon-caret-top {
      transition: 0.2s;
      transform-origin: center;
      transform: rotateZ(180deg);
    }
  }

  &__title {
    background: #f8f8f8;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #535353;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .el-icon-caret-top {
      font-size: 20px;
      transition: 0.2s;
      transform-origin: center;
      transform: rotateZ(0deg);
    }
  }

  &__content {
    padding: 0 10px 10px 10px;

    .title {
      font-weight: bold;
      color: #666;
      margin: 10px 0;
    }

    .normal {
      font-weight: normal;
    }

    .scle-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
