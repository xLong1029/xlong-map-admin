<template>
  <div v-drag class="util-panel slice-panel">
    <div class="util-panel__header">
      <span>{{ panel.utilName }}分析工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content slice-panel__content">
    </div>
  </div>
</template>

<script>

export default {
  name: "SlicePanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "剖面",
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
    const panelID = "slicePanel";
    
    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "Slice",
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
.slice-panel {
  width: 260px;

  &__content{
    padding: 10px;
  }
}
</style>


