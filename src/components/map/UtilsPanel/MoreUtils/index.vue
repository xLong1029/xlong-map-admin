<template>
  <el-popover
    :placement="placement"
    :width="268"
    :trigger="trigger"
    v-model:visible="visible"
    popper-class="more-utils-container"
  >
    <template #reference>
      <slot></slot>
    </template>
    <div class="more-utils__title">
      <span class="title">工具箱</span>
      <span class="settings pointer" @click="onCustomUtil"
        ><i class="util-list-item__icon iconfont icon-setting mr-5"></i>自定义工具栏</span
      >
    </div>
    <div class="more-utils__content">
      <div v-for="(item, index) in utilList" :key="'other-utils' + index">
        <div class="more-util-list__title">{{ item.title }}</div>
        <ul class="more-util-list">
          <li
            v-for="(child, index) in item.children"
            :key="'other-utils-item' + index"
            :class="setClassStyles(child)"
            @click="onClickUtil(child, child.eventSuffix, child.panelID)"
          >
            <div class="more-util-list-item__icon">
              <i :class="child.classStyles"></i>
            </div>
            <div class="more-util-list-item__name">{{ child.utilName }}</div>
          </li>
        </ul>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import utilsPanel from "common/utilsPanel.js";

const props = defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
  trigger: {
    type: String,
    default: "click",
  },
  // 当前地图视图为2D或者3D
  mapViewType: {
    type: String,
    default: "3D",
  },
  // 高亮面板数组
  highlightPanels: {
    type: Array,
    default: () => [],
  },
  utilList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["click-util", "click-custom"]);

const { isUtilDisabled, isUtilActive, moreUtilPanel } = utilsPanel();

const visible = ref(false);

/**
 * 工具点击事件
 * @param panel 面板对象
 * @param eventSuffix 事件后缀名
 * @param panelID 工具应添加容器的ID
 */
const onClickUtil = (panel, eventSuffix, panelID) => {
  visible.value = false;

  const { enable2D, enable3D } = panel;

  if (isUtilDisabled(enable2D, enable3D, props.mapViewType)) {
    return false;
  }

  emit("click-util", { panel, eventSuffix, panelID });
};

// 设置样式
const setClassStyles = ({ enable2D, enable3D, component }) => {
  let classStyles = "more-util-list-item";

  if (isUtilDisabled(enable2D, enable3D, props.mapViewType)) {
    classStyles += " is-disabled";
  }

  if (isUtilActive(props.highlightPanels, component)) {
    classStyles += " is-active";
  }

  return classStyles;
};

// 自定义工具栏
const onCustomUtil = () => {
  visible.value = false;

  emit("click-custom", true);
};
</script>
<style lang="scss" scoped>
@import "@/styles/more-utils.scss";
</style>
<style>
.more-utils-container {
  padding-bottom: 5px !important;
}
</style>
