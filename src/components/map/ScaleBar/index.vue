<template>
  <div class="scale-bar">
    <span class="ruler-img">
      <img class="scale-bar-img" :src="scalebarImg" />
    </span>
    <span class="ruler-text">
      <span style="text-align: left; display: inline-block">0</span>
      <span
        style="text-align: center; display: inline-block"
        v-if="coordInfo.scale < 50000"
        >{{ (coordInfo.scale / 100).toFixed(0) }}</span
      >
      <span
        style="text-align: center; display: inline-block"
        v-if="coordInfo.scale >= 50000"
        >{{ (coordInfo.scale / 100000).toFixed(0) }}</span
      >
      <span
        style="text-align: right; display: inline-block"
        v-if="coordInfo.scale < 50000"
        >{{ (coordInfo.scale / 100).toFixed(0) * 2 }} 米</span
      >
      <span
        style="text-align: right; display: inline-block"
        v-if="coordInfo.scale >= 50000"
        >{{ (coordInfo.scale / 100000).toFixed(0) * 2 }} 千米</span
      >
    </span>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import scalebarImg from "assets/images/scale-bar.jpg";

// 坐标信息
const coordInfo = inject("getCoordInfo");
</script>

<style lang="scss" scoped>
.scale-bar {
  height: 36px;
  width: 100px;
  position: absolute;
  bottom: 25px;
  right: 50px;
  font-size: 12px;

  &-img {
    height: 5px;
    width: 100%;
  }
}
.ruler-img {
  padding: 4px 14px 0 14px;
  display: inline-block;
  width: 100%;
  height: 16px;
}
.ruler-text {
  display: flex;
  width: 100%;
  height: 18px;
  font-size: 11px;
  text-shadow: 0px 0px 0px #fff, 1px 0px 0px #fff, 0px -1px 0px #fff;

  span {
    flex: 1;
  }
}
</style>
