<template>
  <div v-drag class="util-panel daylight-panel">
    <div class="util-panel__header">
      <span>{{ panel.utilName }}分析工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content daylight-panel__content">
    </div>
  </div>
</template>

<script>
export default {
  name: "DayLightPanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "日照",
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
    const panelID = "dayLightPanel";

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "DayLight",
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
.daylight-panel {
  width: 360px;

  &__content{
    padding: 5px 5px 5px 10px;
  }
}
</style>


