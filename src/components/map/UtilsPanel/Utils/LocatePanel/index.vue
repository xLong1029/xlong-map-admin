<template>
  <div v-drag class="util-panel locate-panel">
    <div class="util-panel__header drag-move">
      <span>{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content locate-panel__content">
      <el-form label-width="70px">
        <el-form-item label="坐标系：">
          <el-select v-model="coord" placeholder="请选择坐标系">
            <el-option
              v-for="item in coords"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="X坐标：">
          <el-input v-model="posX"></el-input>
        </el-form-item>
        <el-form-item label="Y坐标：">
          <el-input v-model="posY"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="locateTo">定位到该点</el-button>
          <el-button size="mini" type="primary" @click="getLocate">从图上拾取</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import common from "common";
import { nextTick, watch } from "@vue/runtime-core";

import { ref } from "@vue/reactivity";
export default {
  name: "LocatePanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "定位",
      }),
    },
    // 当前面板索引在panelList中的索引
    index: {
      type: Number,
      default: 0,
    },
    mapViewType: {
      type: String,
      default: "3D",
    },
  },

  setup(props, content) {
    const { dispatchMapEvent } = common();

    // 当前面板ID
    const panelID = "locatePanel";

    const posX = ref(0);
    const posY = ref(0);
    const coord = ref(1);
    const result = ref({});

    watch(
      () => result,
      () => {
        if (result.value) {
          posX.value = result.x;
          posY.value = result.y;
        }
      }
    );

    const coords = ref([
      {
        Code: 1,
        Name: "2000坐标系",
        wkid: 4490,
      },
      {
        Code: 2,
        Name: "54坐标系",
        wkid: 4214,
      },
      {
        Code: 3,
        Name: "80坐标系",
        wkid: 4610,
      },
    ]);

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "Locate",
        panelID,
      });
    };

    const locateTo = () => {
      let x = posX.value;
      let y = posY.value;
      nextTick(() => {
        dispatchMapEvent("onLocateToCoordAndMarket", {
          title: "",
          x: x,
          y: y,
          wkid: 4490,
        });
      });
    };

    const getLocate = () => {
      nextTick(() => {
        result.fromWkid = coords.value.find((x) => x.Code == coord.value).wkid;
        dispatchMapEvent("onGetLocateCoord", result);
      });
    };

    return {
      panelID,
      onClose,
      posX,
      posY,
      coord,
      locateTo,
      getLocate,
      coords,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.locate-panel {
  width: 300px;

  &__content {
    padding: 10px;
  }
}
</style>
