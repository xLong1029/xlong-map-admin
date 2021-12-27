<template>
  <div class="transfer-container">
    <!-- 上方 -->
    <div class="transfer-top">
      <div class="transfer__title">
        <el-checkbox
          v-model="topDataCheckedAll"
          :label="titles[0]"
          @change="onChangeCheckTopDataAll"
        ></el-checkbox>
        <div class="check-num">{{ topDataChecked.length }} / {{ topDatas.length }}</div>
      </div>
      <div class="transfer__content">
        <List
          :data="topDatas"
          :props="props"
          :type="1"
          @change-check="onChangeCheck"
          @set-layer-visible="onSetLayerVisible"
          @change-sort="onChangeSort"
        />
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="transfer-operate">
      <el-button
        type="primary"
        icon="el-icon-arrow-up"
        :title="`移动到${titles[0]}`"
        :disabled="!bottomDataChecked.length"
        @click="moveTo(1)"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-arrow-down"
        :title="`移动到${titles[1]}`"
        :disabled="!topDataChecked.length"
        @click="moveTo(-1)"
      ></el-button>
    </div>
    <!-- 下方 -->
    <div class="transfer-bottom">
      <div class="transfer__title">
        <el-checkbox
          v-model="bottomDataCheckedAll"
          :label="titles[1]"
          @change="onChangeCheckBottomDataAll"
        ></el-checkbox>
        <div class="check-num">
          {{ bottomDataChecked.length }} / {{ bottomDatas.length }}
        </div>
      </div>
      <div class="transfer__content">
        <List
          :data="bottomDatas"
          :props="props"
          :type="-1"
          @change-check="onChangeCheck"
          @set-layer-visible="onSetLayerVisible"
          @change-sort="onChangeSort"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import List from "./List.vue";
// import Draggable from "vuedraggable";

const thisProps = defineProps({
  // 未选中的数据，在上方
  unSelectValues: {
    type: Array,
    default: [],
  },
  // 选中的数据，在下方
  selectValues: {
    type: Array,
    default: [],
  },
  // 所有数据
  data: {
    type: Array,
    default: [],
  },
  // 穿梭器标题
  titles: {
    type: Array,
    default: ["上方", "下方"],
  },
  // 属性
  props: {
    type: Object,
    default: {
      key: "id",
      label: "title",
    },
  },
});

const emit = defineEmits([
  "update:un-select-values",
  "update:select-values",
  "change",
  "sort-top",
  "sort-bottom",
  "set-layer-visible",
]);

// 上方数据
const topDatas = ref([]);
const topDataCheckedAll = ref(false);
const topDataChecked = ref([]);

// 下方数据
const bottomDatas = ref([]);
const bottomDataCheckedAll = ref(false);
const bottomDataChecked = ref([]);

onMounted(() => {
  handleDatas();
});

// 处理数据
const handleDatas = () => {
  const { selectValues, data, props } = thisProps;
  if (!selectValues.length) {
    topDatas.value = JSON.parse(JSON.stringify(...data));
    bottomDatas.value = [];
  } else {
    data.forEach((e) => {
      // 默认全部可见
      e.visible = true;

      // 是否选中数据
      if (selectValues.indexOf(e[props.key]) >= 0) {
        bottomDatas.value.push(e);
      } else {
        topDatas.value.push(e);
      }
    });
  }
};

// 全选上方
const onChangeCheckTopDataAll = (val) => {
  topDatas.value.forEach((e) => (e.checked = val));
  topDataChecked.value = val ? [...topDatas.value] : [];
};

// 全选下方
const onChangeCheckBottomDataAll = (val) => {
  bottomDatas.value.forEach((e) => (e.checked = val));
  bottomDataChecked.value = val ? [...bottomDatas.value] : [];
};

/**
 * 勾选元素
 *
 * @param {*} element 当前选中元素
 * @param {*} type 类型  1勾选上方元素 -1勾选下方元素
 */
const onChangeCheck = (element, type) => {
  const { props } = thisProps;

  let checkDatas = type === 1 ? [...topDataChecked.value] : [...bottomDataChecked.value];

  const findItemIndex = checkDatas.findIndex((e) => e[props.key] === element[props.key]);
  if (element.checked && findItemIndex < 0) {
    checkDatas.push(element);
  } else if (!element.checked && findItemIndex >= 0) {
    checkDatas.splice(findItemIndex, 1);
  }

  if (type === 1) {
    topDataChecked.value = checkDatas;
    topDataCheckedAll.value = topDatas.value.length <= checkDatas.length ? true : false;
  } else {
    bottomDataChecked.value = checkDatas;
    bottomDataCheckedAll.value =
      bottomDatas.value.length <= checkDatas.length ? true : false;
  }
};

/**
 * 移动元素
 *
 * @param {*} type 类型  1移动到上方 -1移动到下方
 */
const moveTo = (type) => {
  const { props } = thisProps;
  if (type === 1) {
    bottomDataChecked.value.forEach((e) => {
      const findItemIndex = bottomDatas.value.findIndex(
        (d) => d[props.key] === e[props.key]
      );
      if (findItemIndex >= 0) {
        bottomDatas.value.splice(findItemIndex, 1);
      }

      e.checked = false;
      topDatas.value.push(e);
    });

    bottomDataChecked.value = [];
    bottomDataCheckedAll.value = false;
  } else {
    topDataChecked.value.forEach((e) => {
      const findItemIndex = topDatas.value.findIndex(
        (d) => d[props.key] === e[props.key]
      );
      if (findItemIndex >= 0) {
        topDatas.value.splice(findItemIndex, 1);
      }

      e.checked = false;
      bottomDatas.value.push(e);
    });

    topDataChecked.value = [];
    topDataCheckedAll.value = false;
  }

  upadteValue();
};

// 更新选中数据
const upadteValue = () => {
  const { props } = thisProps;

  const unSelectvalues = topDatas.value.map((e) => e[props.key]);
  const selectValues = bottomDatas.value.map((e) => e[props.key]);

  emit("update:un-select-values", unSelectvalues);
  emit("update:select-values", selectValues);
  emit("change", selectValues, unSelectvalues);
};

/**
 * 排序元素
 *
 * @param {*} event 事件
 * @param {*} type 类型  1移动到上方 -1移动到下方
 */
const onChangeSort = (event, type) => {
  console.log(type);

  const { props } = thisProps;

  if (type === 1) {
    const unSelectvalues = topDatas.value.map((e) => e[props.key]);

    emit("update:un-select-values", unSelectvalues);
    emit("sort-top", unSelectvalues);
  } else {
    const selectValues = bottomDatas.value.map((e) => e[props.key]);

    emit("update:select-values", selectValues);
    emit("sort-bottom", selectValues);
  }
};

// 设置图层可见性
const onSetLayerVisible = (element, visible) => {
  element.visible = visible;
  emit("set-layer-visible", element, visible);
};
</script>

<style lang="scss" scoped>
.transfer {
  &-top,
  &-bottom {
    height: 250px;
    overflow: hidden;
    border: $border;
    border-radius: 4px;
  }

  &-operate {
    margin: 10px 0;
    text-align: center;
  }

  &__title {
    background: #f5f7fa;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .check-num {
      font-size: 12px;
    }
  }

  &__content {
    height: 210px;
    overflow-y: auto;
  }

  &-item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      max-width: 240px;
    }

    .operate {
      .iconfont {
        margin-left: 15px;
        font-size: 16px;
      }
    }

    .visible-btn {
      cursor: pointer;
    }

    .move-btn {
      cursor: move;
    }

    &.ghost {
      opacity: 0.5;
      background: #e0f0ff;
    }
  }
}
</style>
