<template>
  <div v-drag class="util-panel elevation-profile-panel">
    <div class="util-panel__header">
      <span>{{ panel.utilName }}分析工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content elevation-profile__content">
    </div>
  </div>
</template>

<script>
export default {
  name: "ElevationProfilePanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "剖面高度",
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
    const panelID = "elevationProfilePanel";

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "ElevationProfile",
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
.elevation-profile-panel {
  width: 400px;

  &__content{
    padding: 10px;
  }
}
</style>


