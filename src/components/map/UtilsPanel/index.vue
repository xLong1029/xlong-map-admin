<template>
  <div class="utils-panel">
    <div class="utils-panel-wrapper">
      <!-- 常用工具列表 -->
      <div class="util-list-wrapper">
        <div class="util-list">
          <!-- 固定常用工具 -->
          <template v-if="commonUtils.length">
            <div
              v-for="(item, index) in commonUtils"
              :key="'common-util' + index"
              :class="[
                'util-list-item',
                commonUtils[index].utilActive ? 'is-active' : '',
              ]"
              @click="onClickUtil(item, item.eventSuffix, item.panelID)"
            >
              <i class="util-list-item__icon" :class="item.classStyles"></i>
              <span class="util-list-item__name">{{ item.utilName }}</span>
            </div>
          </template>

          <!-- 自定义常用工具 -->
          <template v-if="customUtils.length">
            <div
              v-for="(item, index) in customUtils"
              :key="'custom-util' + index"
              :class="setClassStyles(item)"
              @click="onClickUtil(item, item.eventSuffix, item.panelID)"
            >
              <i class="util-list-item__icon" :class="item.classStyles"></i>
              <span class="util-list-item__name">{{ item.utilName }}</span>
            </div>
          </template>

          <div class="util-list-item" @click="onClearScreen()">
            <i class="util-list-item__icon iconfont icon-clear"></i>
            <span class="util-list-item__name">清屏</span>
          </div>
        </div>

        <div class="more" @click="onClickMore">更多</div>
      </div>

      <!-- 工具面板 -->
      <template v-if="panelList.length">
        <template v-for="(item, index) in panelList" :key="'util-panel' + index">
          <template v-if="item.utilActive">
            <component
              :is="item.component"
              :panel="item"
              :index="index"
              :map-view-type="mapViewType"
              @close="onClosePanel"
            />
          </template>
        </template>
      </template>

      <!-- 更多工具 -->
      <!-- <more-utils
        v-if="moreUtils.visible"
        :map-view-type="mapViewType"
        :highlight-panels="highlightPanels"
        @click-util="onClickMoreUtils"
        @click-custom="setCustomUtilDialogVisible(true)"
      /> -->

      <!-- 自定义工具栏 -->
      <!-- <custom-util-dialog
        :visible="customUtilDialog.visible"
        @close="setCustomUtilDialogVisible(false)"
        @save="onSaveCustomUtils"
      /> -->
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import { nextTick } from "vue";
import { useStore } from "vuex";
// import MoreUtils from "./MoreUtils/index.vue";
// import CustomUtilDialog from "./MoreUtils/CustomUtilDialog.vue";
import {
  DrawPanel,
  MeasurePanel,
  // SlicePanel,
  // DayLightPanel,
  // ElevationProfilePanel,
  // LineOfSightPanel,
  // ScreenShotPanel,
  // LocatePanel,
} from "./Utils/index.js";
import common from "common";
import { getLocalS } from "utils";
import moreUtilPanel from "mock/moreUtilPanel.json";

export default {
  name: "UtilsPanel",

 components: {
    // MoreUtils,
    // CustomUtilDialog,
    MeasurePanel,
    DrawPanel,
    // MeasurePanel,
    // SlicePanel,
    // DayLightPanel,
    // ElevationProfilePanel,
    // LineOfSightPanel,
    // ScreenShotPanel,
    // LocatePanel,
  },

  setup(props, { emit }) {
    const { dispatchMapEvent } = common();

    // 固定常用工具
    const commonUtils = ref([
      {
        component: "MeasurePanel",
        classStyles: "iconfont icon-juliceliang",
        utilName: "量算",
        utilActive: false,
        eventSuffix: "Measure",
        panelID: null,
      },
      {
        component: "DrawPanel",
        classStyles: "iconfont icon-huizhi",
        utilName: "绘制",
        utilActive: false,
        eventSuffix: "Draw",
        panelID: "drawPanel",
      },
    ]);

    // 工具面板列表
    const panelList = ref([
      // json内容示例
      // {
      //   // 对应组件
      //   component: "MeasurePanel",
      //   // 图标样式
      //   classStyles: "iconfont icon-liangsuan",
      //   // 工具名称
      //   utilName: "量算",
      //   // 工具激活/高亮状态
      //   utilActive: false,
      //   // 传递事件后缀名, 例如 "onOpenMeasure" 和 "onRemoveMeasure"
      //   eventSuffix: "Measure",
      //   // 工具应添加容器的ID
      //   panelID: null,
      //   // 2D模式下是否可用
      //   enable2D: true,
      //   // 3D模式下是否可用
      //   enable3D: true
      // }
    ]);

    // 高亮面板
    const highlightPanels = ref([]);

    // 获取顶级组件传递的值：当前地图视图是2D或者3D
    const mapViewType = inject("getMapViewType");

    // 自定义常用工具
    const customUtils = ref([]);

    // 更多面板
    const moreUtils = reactive({
      visible: false,
    });

    // 自定义工具弹窗
    const customUtilDialog = reactive({
      visible: false,
    });

    onMounted(() => {
      let list = [];

      moreUtilPanel.general.forEach((e) => {
        list.push(e);
      });

      moreUtilPanel.list.forEach((e) => {
        if (e.children && e.children.length) {
          e.children.forEach((c) => {
            list.push(c);
          });
        }
      });

      // 从缓存获取自定义工具
      if (getLocalS("customUtils")) {
        customUtils.value = [...JSON.parse(getLocalS("customUtils"))];
      }

      panelList.value = [...commonUtils.value, ...list];

      // console.log(panelList.value);
    });

    /**
     * 工具点击事件
     * @param panel 面板对象
     * @param eventSuffix 事件后缀名
     * @param panelID 工具应添加容器的ID
     */
    const onClickUtil = (panel, eventSuffix, panelID) => {
      // console.log(panel, eventSuffix, panelID);

      // 禁止操作
      const { enable2D, enable3D } = panel;
      if (isUtilDisabled(enable2D, enable3D, mapViewType.value)) {
        return false;
      }

      // 关闭更多面板
      moreUtils.visible = false;

      const { component } = panel;

      const index = panelList.value.findIndex((e) => e.component === component);
      setPanelVisble(panel, index, !panelList.value[index].utilActive);

      // 图形分析、分屏、时间轴
      if (
        component === "GraphicAnalysis" ||
        component === "SplitScreen" ||
        component === "TimeAxis" ||
        component === "Panorama"
      ) {
        emit("open-full-screen-window", {
          visible: panelList.value[index].utilActive,
          panel,
          index,
        });
        return;
      }

      handleUtilPanelEvent(panelList.value[index].utilActive, eventSuffix, panelID);
    };

    // 点击更多面板里的工具
    const onClickMoreUtils = ({ panel, eventSuffix, panelID }) => {
      onClickUtil(panel, eventSuffix, panelID);
    };

    // 点击更多
    const onClickMore = () => {
      moreUtils.visible = !moreUtils.visible;
    };

    // 自定义工具栏可见性
    const setCustomUtilDialogVisible = (val) => {
      customUtilDialog.visible = val;

      // 关闭更多面板
      if (val) {
        moreUtils.visible = false;
      }
    };

    // 保存自定义工具
    const onSaveCustomUtils = () => {
      setCustomUtilDialogVisible(false);
      if (getLocalS("customUtils")) {
        customUtils.value = [...JSON.parse(getLocalS("customUtils"))];
      }
    };

    // 设置样式
    const setClassStyles = ({ enable2D, enable3D, component }) => {
      let classStyles = "util-list-item";

      if (isUtilDisabled(enable2D, enable3D, mapViewType.value)) {
        classStyles += " is-disabled";
      }

      if (isUtilActive(highlightPanels.value, component)) {
        classStyles += " is-active";
      }

      return classStyles;
    };

    /**
     * 设置面板可见性
     * @param panel 面板对象
     * @param index 面板索引
     * @param active 是否激活
     */
    const setPanelVisble = (panel, index, active) => {
      panelList.value[index].utilActive = active;
      handleHighlightPanels(panel, active);
    };

    /**
     * 处理高亮面板
     * @param {*} panel 面板对象
     * @param {*} utilActive 面板激活状态
     */
    const handleHighlightPanels = (panel, utilActive) => {
      const index = highlightPanels.value.findIndex(
        (e) => e.component === panel.component
      );

      if (utilActive && index < 0) {
        highlightPanels.value.push(panel);
      } else if (!utilActive && index >= 0) {
        highlightPanels.value.splice(index, 1);
      }
    };

    /**
     * 判断工具是否禁止
     * @param {*} enable2D 2D模式下是否可用
     * @param {*} enable3D 2D模式下是否可用
     * @param {*} mapViewType 当前地图视图为2D或3D
     * @returns ture/false
     */
    const isUtilDisabled = (enable2D, enable3D, mapViewType) => {
      if (
        (enable2D && mapViewType === "3D" && !enable3D) ||
        (enable3D && mapViewType === "2D" && !enable2D)
      ) {
        return true;
      }
      return false;
    };

    /**
     * 当前面板是否高亮
     * @param {*} hPanels 当前实例的高亮面板对象
     * @param {*} component 当前面板对应的组件
     * @returns ture/false
     */
    const isUtilActive = (hPanels, component) => {
      const index = hPanels.findIndex((e) => e.component === component);
      return index >= 0;
    };

    // 当前面板是否高亮
    const isHighlightPanel = (panel) => {
      const index = highlightPanels.value.findIndex(
        (e) => e.component === panel.component
      );
      return index >= 0;
    };

    /**
     * 处理工具面板展开或者收起
     * @param panel 面板对象
     * @param eventSuffix 事件后缀名
     * @param panelID 工具应添加容器的ID
     */
    const handleUtilPanelEvent = (utilActive, eventSuffix, panelID) => {
      if (eventSuffix) {
        nextTick(() => {
          dispatchMapEvent(
            utilActive ? `onOpen${eventSuffix}` : `onRemove${eventSuffix}`,
            panelID
              ? {
                  panelID,
                }
              : null
          );
        });
      }
    };

    // 清屏
    const onClearScreen = () => {
      const events = [];
      const data = null;

      panelList.value.forEach((e) => {
        if (e.utilActive) {
          e.utilActive = false;
          events.push({
            event: `onRemove${e.eventSuffix}`,
            data,
          });
        }
      });

      events.push({
        event: "onClearScreen",
        data,
      });

      dispatchMapEvent(events);
    };

    // 点击关闭按钮关闭面板
    const onClosePanel = ({ panel, index, active, eventSuffix, panelID }) => {
      setPanelVisble(panel, index, active);
      handleUtilPanelEvent(panelList.value[index].utilActive, eventSuffix, panelID);
    };

    return {
      mapViewType,
      panelList,
      commonUtils,
      customUtils,
      moreUtils,
      customUtilDialog,
      highlightPanels,
      onClosePanel,
      onClearScreen,
      onClickMore,
      setPanelVisble,
      onClickUtil,
      onClickMoreUtils,
      setCustomUtilDialogVisible,
      onSaveCustomUtils,
      isHighlightPanel,
      handleHighlightPanels,
      setClassStyles,
    };
  },
};
</script>
<style lang="scss" scoped>
.utils-panel {
  position: absolute;
  top: 10px;
  right: 15px;

  &-wrapper {
    position: relative;
  }

  .more,
  .settings {
    cursor: pointer;
    background: #535353;
    padding: 2px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    -webkit-text-size-adjust: none;
    -webkit-transform: scale(0.8);
    margin-bottom: 4px;
    text-align: center;
  }
}

.util-list {
  padding: 6px;

  &-wrapper {
    background: #fff;
    padding: 2px;
    border-radius: $map-border-radius;
    box-shadow: $map-box-shadow;
    width: 44px;
  }

  &-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;

    &.is-active {
      color: $primary-color;
    }

    &.is-disabled {
      cursor: not-allowed;

      .util-list-item__icon,
      .util-list-item__name {
        color: #c7c7c7;
      }
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    &__icon {
      font-size: 24px;
    }

    &__name {
      margin-top: 2px;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
