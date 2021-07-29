<template>
  <div class="more-utils-container">
    <!-- 常用工具 -->
    <div class="general-utils-container">
      <ul class="more-util-list">
        <li
          v-for="(item, index) in generalUtils"
          :key="'general-utils-item' + index"
          :class="setClassStyles(item)"
          @click="onClickUtil(item, item.eventSuffix, item.panelID)"
        >
          <div class="more-util-list-item__icon"><i :class="item.classStyles"></i></div>
          <div class="more-util-list-item__name">{{ item.utilName }}</div>
        </li>
      </ul>
    </div>

    <!-- 其他工具列表 -->
    <div v-for="(item, index) in utilList" :key="'other-utils' + index">
      <div class="more-util-list__title">{{ item.title }}</div>
      <ul class="more-util-list">
        <li
          v-for="(child, index) in item.children"
          :key="'other-utils-item' + index"
          :class="setClassStyles(child)"
          @click="onClickUtil(child, child.eventSuffix, child.panelID)"
        >
          <div class="more-util-list-item__icon"><i :class="child.classStyles"></i></div>
          <div class="more-util-list-item__name">{{ child.utilName }}</div>
        </li>
      </ul>
    </div>

    <!-- 自定义工具栏 -->
    <div class="custiom-utils-container" @click="onCustomUtil">
      <i class="el-icon-plus mr-5"></i><span>自定义工具栏</span>
    </div>
  </div>
</template>

<script>
import moreUtilPanel from "mock/moreUtilPanel.json";
import { reactive } from "@vue/reactivity";
import utilsPanel from "common/utilsPanel";

export default {
  name: "moreUtil",

  props: {
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
  },

  setup(props, { emit }) {
    const { isUtilDisabled, isUtilActive } = utilsPanel();

    const generalUtils = reactive([...moreUtilPanel.general]);
    const utilList = reactive([...moreUtilPanel.list]);

    /**
     * 工具点击事件
     * @param panel 面板对象
     * @param eventSuffix 事件后缀名
     * @param panelID 工具应添加容器的ID
     */
    const onClickUtil = (panel, eventSuffix, panelID) => {
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

    // 自定义工具
    const onCustomUtil = () => {
      emit("click-custom", true);
    };

    return {
      generalUtils,
      utilList,
      onClickUtil,
      setClassStyles,
      onCustomUtil,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/more-utils.scss";

.custiom-utils-container {
  border: 1px dashed #ddd;
  background: #f5f5f5;
  border-radius: $map-border-radius;
  text-align: center;
  padding: 3px;
  font-size: 12px;
  color: #666;
  cursor: pointer;

  &:hover {
    border-color: $primary-color;
    color: $primary-color;
  }
}
</style>
