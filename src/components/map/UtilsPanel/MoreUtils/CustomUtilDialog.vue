<template>
  <el-dialog
    title="自定义工具栏"
    :modelValue="visible"
    @close="onClose()"
    :width="370"
    custom-class="custom-dialog-container"
  >
    <!-- 工具列表 -->
    <div v-for="(item, index) in utilList" :key="'util-list' + index">
      <div class="more-util-list__title">{{ item.title }}</div>
      <Draggable
        class="more-util-list"
        :list="item.children"
        :group="{ name: 'util', pull: 'clone', put: false }"
        :sort="false"
        :clone="onAddCustomUtil"
        @change="onChangeCustomUtil"
        item-key="component"
      >
        <template #item="{ element }">
          <li class="more-util-list-item">
            <div class="more-util-list-item__icon">
              <i :class="element.classStyles"></i>
            </div>
            <div class="more-util-list-item__name">{{ element.utilName }}</div>
          </li>
        </template>
      </Draggable>
    </div>

    <el-alert
      class="mt-10"
      title="您可以将常用的工具拖入虚线框内并进行拖动排序"
      type="success"
      :closable="false"
    ></el-alert>

    <!-- 拖拽区域 -->
    <div class="setting-conatiner">
      <div class="drag-container" @click="onCustomUtil">
        <div v-if="!customUtils.length" class="mt-10">
          <i class="el-icon-plus"></i>
          <span class="block mt-10">拖动工具到此处</span>
        </div>

        <Draggable
          class="custom-utils-container more-util-list"
          :list="customUtils"
          group="util"
          @change="onChangeCustomUtil"
          item-key="component"
        >
          <template #item="{ element }">
            <li class="more-util-list-item" @click="onRemoveCustomUtil(element)">
              <i class="el-icon-error"></i>
              <div class="more-util-list-item__icon">
                <i :class="element.classStyles"></i>
              </div>
              <div class="more-util-list-item__name">{{ element.utilName }}</div>
            </li>
          </template>
        </Draggable>
      </div>
      <div class="button-container">
        <el-button @click="onClearCustomUtils" :disabled="!customUtils.length"
          >清空</el-button
        >
        <el-button type="primary" @click="onSaveCustomUtils">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import Draggable from "vuedraggable";
import { reactive, ref, onMounted } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { setLocalS, getLocalS } from "utils";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  customNum: {
    type: Number,
    default: 5,
  },
  generalUtils: {
    type: Array,
    default: () => [],
  },
  utilList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "save"]);

// 自定义常用工具
const customUtils = ref([]);

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

onMounted(() => {
  // 从缓存获取自定义工具
  if (getLocalS("customUtils")) {
    customUtils.value = [...JSON.parse(getLocalS("customUtils"))];
  } else {
    customUtils.value = [...commonUtils.value];
  }
});

const onClose = () => {
  emit("close", false);
};

// 监听拖拽事件
const onChangeCustomUtil = (event) => {
  // console.log(event);
};

// 添加自定义工具
const onAddCustomUtil = (item) => {
  // console.log(customUtils, item);

  if (customUtils.value.length >= props.customNum) {
    ElMessage.warning(`只能自定义${props.customNum}个工具`);
  } else {
    if (customUtils.value.indexOf(item) < 0) {
      return item;
    } else {
      ElMessage.warning("该工具已存在，请勿重复添加");
    }
  }
};

// 移除自定义工具
const onRemoveCustomUtil = (item) => {
  const index = customUtils.value.findIndex((e) => e.component === item.component);
  customUtils.value.splice(index, 1);
};

// 清空自定义工具
const onClearCustomUtils = () => {
  ElMessageBox.confirm("确定清空所有自定义工具吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      customUtils.value = [];
      ElMessage.success("已清空自定义工具");
    })
    .catch(() => console.log("取消清空"));
};

// 保存自定义工具
const onSaveCustomUtils = () => {
  setLocalS("customUtils", JSON.stringify(customUtils.value));
  ElMessage.success("自定义工具保存成功");
  emit("save", false);
};
</script>
<style lang="scss" scoped>
@import "@/styles/more-utils.scss";
.more-util-list-item {
  cursor: move;

  &:nth-child(4n + 1) {
    margin-left: 8px;
  }

  &:nth-child(4n) {
    margin-right: 8px;
  }

  &:nth-child(5n + 1) {
    margin-left: 0;
  }

  &:nth-child(5n) {
    margin-right: 0;
  }
}

.setting-conatiner {
  margin-top: 10px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.drag-container {
  width: 100%;
  position: relative;
  border: 1px dashed #ddd;
  border-radius: $map-border-radius;
  text-align: center;
  padding: 3px;
  font-size: 12px;
  color: $primary-color;
  min-height: 100px;

  .el-icon-plus {
    font-size: 40px;
    display: inline-block;
    color: #c0c4cc;
  }
}

.custom-utils-container {
  position: absolute;
  top: 0;
  left: 2px;
  width: 100%;
  // height: 100%;
  min-height: 100px;
  padding: 10px 10px;

  .more-util-list-item {
    cursor: pointer;
  }

  .el-icon-error {
    position: absolute;
    right: -5px;
    top: -5px;
    color: $pink;
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.custom-dialog-container {
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }

  .el-alert {
    padding: 8px 5px;
  }
}
</style>
