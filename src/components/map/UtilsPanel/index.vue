<template>
  <div v-loading="panelListLoading" class="utils-panel" :class="{ 'show-header': fixedHeader }">
    <div class="utils-panel-wrapper">
      <!-- 常用工具列表 -->
      <div class="util-list-wrapper">
        <div class="util-list">
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

          <!-- 工具箱 -->
          <MoreUtils
            :map-view-type="mapViewType"
            :highlight-panels="highlightPanels"
            :util-list="utilList"
            @click-util="onClickUtilBoxUtils"
            @click-custom="setCustomUtilDialogVisible(true)"
          >
            <div class="util-list-item">
              <i class="util-list-item__icon iconfont icon-gongjuxiang"></i>
              <span class="util-list-item__name">工具箱</span>
            </div>
          </MoreUtils>
        </div>
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

      <!-- 自定义常用工具栏 -->
      <CustomUtilDialog
        :visible="customUtilDialog.visible"
        :util-list="utilList"
        @close="setCustomUtilDialogVisible(false)"
        @save="onSaveCustomUtils"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
// 组件
import MoreUtils from "./MoreUtils/index.vue";
import CustomUtilDialog from "./MoreUtils/CustomUtilDialog.vue";
import {
  DrawPanel,
  MeasurePanel,
  SlicePanel,
  DayLightPanel,
  ElevationProfilePanel,
  LineOfSightPanel,
  ScreenshotPanel,
  LocatePanel,
} from "./Utils/index.js";
// Api
import Api from "api/map/index.js";

export default defineComponent({
  name: "UtilsPanel",

  components: {
    MoreUtils,
    CustomUtilDialog,
    MeasurePanel,
    DrawPanel,
    MeasurePanel,
    SlicePanel,
    DayLightPanel,
    ElevationProfilePanel,
    LineOfSightPanel,
    ScreenshotPanel,
    LocatePanel,
  },
});
</script>

<script setup>
import {
  defineExpose,
  ref,
  reactive,
  onMounted,
  inject,
  nextTick,
} from "@vue/runtime-core";
// 通用模块
import common from "common";
import utilsPanel from "common/utilsPanel.js";
// 工具
import { getLocalS } from "utils";

const emit = defineEmits(["open-full-screen-window"]);

const { store, dispatchMapEvent, showDevMessage } = common();
const { isUtilDisabled, isUtilActive } = utilsPanel();

// 获取顶级组件传递的值：当前地图视图是2D或者3D
const mapViewType = inject("getMapViewType");
// 获取顶级组件传递的值：是否显示固定头部
const fixedHeader = inject("getFixedHeader");

// 固定常用工具
const commonUtils = ref([
  {
    component: "MeasurePanel",
    classStyles: "iconfont icon-celianggongju",
    utilName: "量算",
    utilActive: false,
    eventSuffix: "Measure",
    panelID: null,
    enable2D: true,
    enable3D: true,
  },
  {
    component: "DrawPanel",
    classStyles: "iconfont icon-huizhi",
    utilName: "绘制",
    utilActive: false,
    eventSuffix: "Draw",
    panelID: "drawPanel",
    enable2D: true,
    enable3D: true,
  },
]);

const panelListLoading = ref(false);

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
  //   enable3D: true,
  //   // 工具是否满屏展示
  //   fullScreen: false
  // }
]);

// 工具列表
const utilList = ref([]);

// 高亮面板
const highlightPanels = ref([]);

// 自定义常用工具
const customUtils = ref([]);

// 自定义工具弹窗
const customUtilDialog = reactive({
  visible: false,
});

onMounted(() => {
  // 从缓存获取自定义工具
  if (getLocalS("customUtils")) {
    customUtils.value = [...JSON.parse(getLocalS("customUtils"))];
  } else {
    customUtils.value = [...commonUtils.value];
  }

  let list = [];

  panelListLoading.value = true;
  Api.GetUtilList()
    .then((res) => {
      const { code, data } = res;
      if (code === 200) {
        utilList.value = data;
        data.forEach((e) => {
          if (e.children && e.children.length) {
            e.children.forEach((c) => {
              list.push(c);
            });
          }
        });

        panelList.value = [...commonUtils.value, ...list];
      }
    })
    .finally(() => (panelListLoading.value = false));
});

/**
 * 工具点击事件
 * @param panel 面板对象
 * @param eventSuffix 事件后缀名
 * @param panelID 工具应添加容器的ID
 */
const onClickUtil = (panel, eventSuffix, panelID) => {
  // console.log(panel, eventSuffix, panelID);

  const { enable2D, enable3D, fullScreen, component } = panel;

  // 禁止操作
  if (isUtilDisabled(enable2D, enable3D, mapViewType.value)) {
    return false;
  }

  const index = panelList.value.findIndex((e) => e.component === component);
  setPanelVisble(panel, index, !panelList.value[index].utilActive);

  // 全屏工具
  if (fullScreen) {
    emit("open-full-screen-window", {
      visible: panelList.value[index].utilActive,
      panel,
      index,
    });
    return;
  }

  handleUtilPanelEvent(panelList.value[index].utilActive, eventSuffix, panelID);
};

// 点击工具箱里的工具
const onClickUtilBoxUtils = ({ panel, eventSuffix, panelID }) => {
  onClickUtil(panel, eventSuffix, panelID);
};

// 自定义工具栏可见性
const setCustomUtilDialogVisible = (val) => {
  customUtilDialog.visible = val;
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
  const index = highlightPanels.value.findIndex((e) => e.component === panel.component);

  if (utilActive && index < 0) {
    highlightPanels.value.push(panel);
  } else if (!utilActive && index >= 0) {
    highlightPanels.value.splice(index, 1);
  }
};

// 当前面板是否高亮
const isHighlightPanel = (panel) => {
  const index = highlightPanels.value.findIndex((e) => e.component === panel.component);
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
      dispatchMapEvent([
        {
          event: utilActive ? `onOpen${eventSuffix}` : `onRemove${eventSuffix}`,
          data: {
            panelID,
            store,
          },
        },
      ]);
    });
  }
};

// 清屏
const onClearScreen = () => {
  const events = [];
  const data = {
    store,
  };

  panelList.value.forEach((e) => {
    if (e.utilActive && e.eventSuffix) {
      e.utilActive = false;
      events.push({
        event: `onRemove${e.eventSuffix}`,
        data,
      });
      // 取消高亮
      handleHighlightPanels(e, false);
    }
  });

  console.log(panelList.value);

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

// 暴露方法给父组件调用
defineExpose({ setPanelVisble });
</script>

<style lang="scss" scoped>
.utils-panel {
  position: absolute;
  top: 15px;
  right: 70px;

  &.show-header {
    right: 15px;
  }

  &-wrapper {
    position: relative;
  }
}

.util-list {
  display: flex;

  &-wrapper {
    background: #fff;
    border-radius: $map-border-radius;
    box-shadow: $map-box-shadow;
    height: 40px;
    overflow: hidden;
  }

  &-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    position: relative;

    &:last-child {
      &::after {
        border-right: none;
      }
    }

    &::after {
      content: "";
      position: absolute;
      right: 0;
      height: 45%;
      border-right: 1px dashed #dbdee2;
    }

    &:hover {
      color: $primary-color;
    }

    &.is-active {
      color: $primary-color;
    }

    &.is-disabled {
      cursor: not-allowed;
      color: #c7c7c7;
    }

    &__icon {
      font-size: 18px;
      margin-right: 3px;
    }

    &__name {
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
