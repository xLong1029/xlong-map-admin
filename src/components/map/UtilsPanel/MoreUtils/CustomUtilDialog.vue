<template>
  <el-dialog
    title="自定义工具栏"
    :modelValue="visible"
    @close="onClose()"
    :width="345"
    custom-class="custom-dialog-container"
  >
    <!-- 常用工具 -->
    <div class="general-utils-container">
      <draggable
        class="more-util-list"
        :list="generalUtils"
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
      </draggable>
    </div>

    <!-- 其他工具列表 -->
    <div v-for="(item, index) in utilList" :key="'other-utils' + index">
      <div class="more-util-list__title">{{ item.title }}</div>
      <draggable
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
      </draggable>
    </div>

    <!-- 拖拽区域 -->
    <div class="setting-conatiner">
      <div class="darg-container" @click="onCustomUtil">
        <p v-if="!customUtils.length">
          将您常用的工具拖入虚线框内,<br />
          工具将在首页显示
        </p>

        <draggable
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
        </draggable>
      </div>
      <div class="button-container">
        <el-button
          size="mini"
          class="mb-5"
          @click="onClearCustomUtils"
          :disabled="!customUtils.length"
          >清空</el-button
        >
        <el-button type="primary" size="mini" class="ml-0" @click="onSaveCustomUtils"
          >保存</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable";
import moreUtilPanel from "mock/moreUtilPanel.json";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { setLocalS, getLocalS } from "utils";

export default {
  name: "CustomUtilDialog",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    draggable,
  },

  // 多个emit事件时需要定义，否则后台警告"Extraneous non-emits event listeners (save) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option"
  emits: ["close", "save"],

  setup(props, { emit }) {
    const generalUtils = reactive([...moreUtilPanel.general]);
    const utilList = reactive([...moreUtilPanel.list]);

    // 自定义常用工具
    const customUtils = ref([]);

    onMounted(() => {
      // 从缓存获取自定义工具
      if (getLocalS("customUtils")) {
        customUtils.value = [...JSON.parse(getLocalS("customUtils"))];
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

      if (customUtils.value.length >= 3) {
        ElMessage.warning("只能自定义3个工具");
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
        .catch();
    };

    // 保存自定义工具
    const onSaveCustomUtils = () => {
      setLocalS("customUtils", JSON.stringify(customUtils.value));
      ElMessage.success("自定义工具保存成功");
      emit("save", false);
    };

    return {
      generalUtils,
      utilList,
      customUtils,
      onClose,
      onChangeCustomUtil,
      onAddCustomUtil,
      onRemoveCustomUtil,
      onClearCustomUtils,
      onSaveCustomUtils,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/more-utils.scss";
.more-util-list-item {
  cursor: move;

  // &:nth-child(5n + 1) {
  //   margin-left: 8px;
  // }

  // &:nth-child(5n) {
  //   margin-right: 8px;
  // }

  // &:nth-child(6n + 1) {
  //   margin-left: 0;
  // }

  // &:nth-child(6n) {
  //   margin-right: 0;
  // }
}

.setting-conatiner {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.darg-container {
  width: 100%;
  position: relative;
  border: 1px dashed #ddd;
  border-radius: $map-border-radius;
  text-align: center;
  padding: 3px;
  font-size: 12px;
  color: $primary-color;
  height: 64px;
}

.custom-utils-container {
  position: absolute;
  top: 0;
  left: -2px;
  width: 100%;
  height: 100%;
  padding: 0 10px;

  .more-util-list-item {
    cursor: pointer;
  }

  .el-icon-error {
    position: absolute;
    right: -5px;
    top: -5px;
    color: $pink;
    border: 1px solid #fff;
  }
}
</style>
<style lang="scss">
.custom-dialog-container {
  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
}
</style>