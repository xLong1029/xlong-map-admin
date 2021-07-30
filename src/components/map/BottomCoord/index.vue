<template>
  <div class="bottom-coord">
    <div>
      <span class="coordinate"
        ><span v-if="coordInfo.lon">经度；{{ coordInfo.lon }}</span>
        <span v-if="coordInfo.lat"> , 纬度：{{ coordInfo.lat }}</span>
        <span v-if="coordInfo.scale"
          >&nbsp;&nbsp;|&nbsp;&nbsp;比例尺 1:{{ coordInfo.scale }}</span
        >
        <span v-if="coordInfo.tilt"
          >&nbsp;&nbsp;|&nbsp;&nbsp;视角倾斜：{{ coordInfo.tilt }}°</span
        >
        <span v-if="coordInfo.heading"> , 罗盘方位：{{ coordInfo.heading }}°</span>
        <span v-if="coordInfo.locate"
          >&nbsp;&nbsp;|&nbsp;&nbsp;当前鼠标坐落：{{ coordInfo.locate }}</span
        >
      </span>
      <span class="scale-hint" @click="setScale(1500)">以最佳比例1:1500显示</span>
    </div>
    <div class="copyright">
      <a class="link" target="blank" href="https://github.com/xLong1029/xlong-map-vue3">{{
        companyName
      }}</a>
      All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";

export default {
  name: "BottomCoord",

  props: {
    companyName: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    // 坐标信息
    const coordInfo = inject("getCoordInfo");

    const setScale = (scale) => {
      emit("map-set-view-scale", { scale: Math.round(scale) });
    };

    return {
      coordInfo,
      setScale,
    };
  },
};
</script>
<style lang="scss" scoped>
.bottom-coord {
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .coordinate,
  .scale-hint,
  .copyright {
    padding: 5px;
  }

  .coordinate {
    background: rgba(255, 255, 255, 0.65);
    border-radius: 0px 4px 0 0;
    margin-right: 5px;
    padding: 5px;
  }

  .scale-hint {
    background: $primary-color;
    color: #fff;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
  }

  .copyright {
    background: rgba(255, 255, 255, 0.65);
    border-radius: 4px 0 0 0;
    .link {
      color: $primary-color;
    }
  }
}
</style>
