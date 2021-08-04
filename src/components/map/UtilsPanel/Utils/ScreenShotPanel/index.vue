<template>
  <div v-drag class="util-panel screen-shot-panel">
    <div class="util-panel__header drag-move">
      <span>{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" @click="onClose"></i>
    </div>
    <div class="util-panel__content screen-shot-panel__content">
      <p v-if="startScreenshot" style="margin: 5px 0">通过单击场景以建立您的截图</p>
      <button
        v-else
        class="esri-button esri-button--primary"
        type="button"
        @click="onStartScreenshot"
      >
        开始截图
      </button>
    </div>
  </div>
</template>

<script>
import common from "common";
import { inject } from "@vue/runtime-core";

export default {
  name: "ScreenshotPanel",

  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "截图",
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

    // 获取顶级组件传递的值：是否开启截图
    const startScreenshot = inject("getStartScreenshot");

    // 当前面板ID
    const panelID = "ScreenshotPanel";

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

    // 开启截图
    const onStartScreenshot = () => {
      startScreenshot.value = true;
      dispatchMapEvent("onScreenShot");
    };

    return {
      startScreenshot,
      onStartScreenshot,
      onClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.screen-shot-panel {
  width: 205px;

  &__content {
    padding: 10px;
  }
}
</style>
