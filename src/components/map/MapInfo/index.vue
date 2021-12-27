<template>
  <div :class="['map-info-panel', foldMapInfoPanel ? 'fold' : 'unfold']">
    <div class="map-info-panel__title" @click="setContentVisible(!foldMapInfoPanel)">
      <div><span>地图信息</span></div>
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      v-if="!foldMapInfoPanel"
      class="map-info-panel__content"
      :class="{ 'show-header': fixedHeader }"
    >
      <div class="title">
        当前视图<span class="normal ml-10"
          ><el-tag size="small" type="success">{{ mapViewType }}视图</el-tag></span
        >
      </div>
      <div class="title">鼠标位置</div>
      <div class="content">
        <span v-if="coordInfo.lon">经度：{{ coordInfo.lon }}</span>
        <span v-if="coordInfo.lat">，纬度：{{ coordInfo.lat }}</span>
        <br />
        <span v-if="coordInfo.locate">当前鼠标坐落：{{ coordInfo.locate }}</span>
      </div>
      <template v-if="mapViewType === '3D'">
        <div class="title">视图方位</div>
        <div class="content">
          <span v-if="coordInfo.tilt">视角倾斜：{{ coordInfo.tilt }}°</span>
          <span v-if="coordInfo.heading"> , 罗盘方位：{{ coordInfo.heading }}°</span>
        </div>
      </template>
      <div class="title">
        <span v-if="coordInfo.scale"
          >地图比例 <span class="normal">1:{{ coordInfo.scale }}</span></span
        >
      </div>
      <div class="content scale-content">
        <el-button type="primary" size="mini" @click="onLocateToNanning()"
          ><i class="iconfont icon-quanfuxianshi mr-5"></i
          ><span>南宁市全幅</span></el-button
        >
        <el-button type="primary" size="mini" @click="setScale(bestScale)"
          ><i class="iconfont icon-bili mr-5"></i
          ><span>最佳比例1:{{ bestScale }}</span></el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "@vue/runtime-core";
// 通用模块
import common from "common";
// 地图
import map from "common/map/index.js";

const props = defineProps({
  // 是否折叠地图信息面板
  foldMapInfoPanel: {
    type: Boolean,
    default: false,
  },
});

// 是否显示系统固定头部
const fixedHeader = inject("getFixedHeader");
// 当前视图类型
const mapViewType = inject("getMapViewType");
// 坐标信息
const coordInfo = inject("getCoordInfo");
// 地图底图
const basemap = inject("getBasemap");
// 最佳比例
const bestScale = ref(2000);

const emit = defineEmits(["click-fold", "map-set-view-scale"]);

const { dispatchMapEvent } = common();
const { mapCenterPoint } = map();

watch(
  () => basemap.value,
  (val) => {
    bestScale.value = val === "terrain" ? 30000 : 2000;
  }
);

// 收起面板
const setContentVisible = (val) => {
  emit("click-fold", val);
};

// 设置当前比例
const setScale = (scale) => {
  emit("map-set-view-scale", { scale: Math.round(scale) });
};

const onLocateToNanning = () => {
  dispatchMapEvent("onLocateToExtent", {
    extent: {
      center: mapCenterPoint,
      tilt: 0,
      heading: 0,
      zoom: 11,
    },
    params: { duration: 3000, showMessage: true },
  });
};
</script>

<style lang="scss" scoped>
.map-info-panel {
  position: absolute;
  // z-index: 10;
  top: 15px;
  left: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  width: 290px;
  overflow: hidden;
  box-shadow: $map-box-shadow;

  &.fold {
    width: 100px;

    .el-icon-caret-top {
      transition: 0.2s;
      transform-origin: center;
      transform: rotateZ(180deg);
    }
  }

  &__title {
    background: #eceef3;
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
      color: #333;
    }
  }
}

.scale-content {
  display: flex;
  justify-content: space-around;
  :deep(.el-button--primary) {
    > span {
      display: flex;
      align-items: center;
    }
  }
}
</style>
