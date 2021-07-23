<template>
  <div v-drag class="util-panel measure-panel">
    <div class="util-panel__header">
      <span>{{ mapViewType }}{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content measure-panel__content">
      <div>
        <button
          class="action-button esri-icon-measure-line"
          :class="activeButton === 'distance' ? 'is-active' : ''"
          id="distanceButton"
          type="button"
          title="测量两点之间的距离"
          @click="
            onMeasureDistance(
              mapViewType === '2D' ? 'onMeasureDistance2D' : 'onMeasureDistance3D'
            )
          "
        ></button>
        <button
          class="action-button esri-icon-measure-area"
          :class="activeButton === 'area' ? 'is-active' : ''"
          id="areaButton"
          type="button"
          title="计算面积"
          @click="
            onMeasureArea(mapViewType === '2D' ? 'onMeasureArea2D' : 'onMeasureArea3D')
          "
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import common from "common";

export default {
  name: "MeasurePanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "量算",
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
    }
  },

  setup(props, content) {
    const { dispatchMapEvent } = common();
    // 当前激活按钮
    const activeButton = ref(null);
    // 当前面板ID
    const panelID = "measurePanel";

    watch(
      () => props.mapViewType,
      () => {
        // 切换2/3D视图时取消原有激活状态
        activeButton.value = null;
      }
    );

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "Measure",
        panelID,
      });
    };

    // 设置当前激活按钮
    const setActiveButton = (val) => {
      activeButton.value = activeButton.value === val ? null : val;
    };

    // 测量距离
    const onMeasureDistance = (eventName) => {
      setActiveButton("distance");
      dispatchMapEvent(eventName, {
        panelID,
        activeButton: activeButton.value,
      });
    };

    // 测量面积
    const onMeasureArea = (eventName) => {
      setActiveButton("area");
      dispatchMapEvent(eventName, {
        panelID,
        activeButton: activeButton.value,
      });
    };

    return {
      activeButton,
      panelID,
      onClose,
      onMeasureDistance,
      onMeasureArea,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.measure-panel {
  width: 300px;
}
</style>
<style lang="scss">
#measureDistance2D,
#measureArea2D,
#measureDistance3D,
#measureArea3D {
  margin-top: 10px;
  border-top: 1px solid #eee;
}
</style>
