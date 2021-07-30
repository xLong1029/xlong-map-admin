<template>
  <div v-drag class="util-panel screen-shot-panel">
    <div class="util-panel__header drag-move">
      <span>{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content screen-shot-panel__content">
      <div>
        <button
          class="action-button esri-icon-media"
          :class="activeButton === 'screenShot' ? 'is-active' : ''"
          id="screenShotButton"
          type="button"
          title="截图"
          @click="onScreenShot('onScreenShot')"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import common from "common";

export default {
  name: "ScreenShotPanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "打印",
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

    // 当前激活按钮
    const activeButton = ref(null);
    // 当前面板ID
    const panelID = "ScreenShotPanel";

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "ScreenShot",
        panelID,
      });
    };

    // 设置当前激活按钮
    const setActiveButton = (val) => {
      activeButton.value = activeButton.value === val ? null : val;
    };

    // 截图工具s

    const onScreenShot = (eventName) => {
      setActiveButton("screenShot");
      dispatchMapEvent(eventName, {
        panelID,
        activeButton: activeButton.value,
      });
    };
    return {
      panelID,
      activeButton,
      onClose,
      onScreenShot,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.screen-shot-panel {
  width: 260px;

  &__content {
    padding: 10px;
  }
}
</style>
