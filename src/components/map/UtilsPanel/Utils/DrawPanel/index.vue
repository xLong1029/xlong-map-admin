<template>
  <div v-drag class="util-panel draw-panel">
    <div class="util-panel__header drag-move">
      <span>{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content draw-panel__content">
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawPanel",
  
  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "绘制",
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
    // 当前面板ID
    const panelID = "drawPanel";

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "Draw",
        panelID,
      });
    };

    return {
      panelID,
      onClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.draw-panel {
  width: 365px;

  &__content {
    padding: 5px 10px;
  }
}
</style>
