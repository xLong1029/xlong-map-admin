<template>
  <div class="scale-bar" :class="{ 'has-bottom-coord': mapBottomCoord }">
    <span class="scale-bar__img">
      <img class="scale-bar-img" :src="scalebarImg" />
    </span>
    <span class="scale-bar__text">
      <div>0</div>
      <div>
        <span v-if="coordInfo.scale < 50000">{{
          (coordInfo.scale / 100).toFixed(0)
        }}</span>
        <span v-if="coordInfo.scale >= 50000">{{
          (coordInfo.scale / 100000).toFixed(0)
        }}</span>
      </div>
      <div>
        <span v-if="coordInfo.scale < 50000"
          >{{ (coordInfo.scale / 100).toFixed(0) * 2 }} m</span
        >
        <span v-if="coordInfo.scale >= 50000"
          >{{ (coordInfo.scale / 100000).toFixed(0) * 2 }} km</span
        >
      </div>
    </span>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import scalebarImg from "assets/images/scale-bar.jpg";

const props = defineProps({
  // 是否显示地图底部信息
  mapBottomCoord: {
    type: Boolean,
    default: true,
  },
});

// 坐标信息
const coordInfo = inject("getCoordInfo");
</script>

<style lang="scss" scoped>
.scale-bar {
  height: 36px;
  width: 120px;
  position: absolute;
  bottom: 0;
  left: 10px;
  font-size: 12px;

  &.has-bottom-coord{
    bottom: 15px;
  }

  &-img {
    height: 6px;
    width: 80px;
    img {
      display: block;
      width: 100%;
      height: 16px;
    }
  }

  &__text {
    display: flex;
    width: 110%;
    height: 18px;
    font-size: 12px;
    transform: scale(0.9);
    text-indent: -6px;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;

    div {
      width: 100%;
    }

    span {
      flex: 1;
      text-align: right;
      display: inline-block;
    }
  }
}
</style>
