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
        <template v-if="topDatas.length">
          <Draggable
            :list="topDatas"
            group="item"
            @change="onChangeTopSort"
            :item-key="props.key"
            handle=".move-btn"
          >
            <template #item="{ element }">
              <div class="transfer-item">
                <el-checkbox
                  v-model="element.checked"
                  :label="element[props.label]"
                  @change="onChangeCheck(element, 1)"
                >
                  <div class="name ellipsis" :title="element[props.label]">
                    {{ element[props.label] }}
                  </div>
                </el-checkbox>
                <i class="iconfont icon-liebiao move-btn" title="可上下移动排序"> </i>
              </div>
            </template>
          </Draggable>
        </template>
        <el-empty v-else :image-size="80"></el-empty>
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
        <template v-if="bottomDatas.length">
          <Draggable
            :list="bottomDatas"
            group="item"
            @change="onChangeBottomSort"
            :item-key="props.key"
            handle=".move-btn"
          >
            <template #item="{ element }">
              <div class="transfer-item">
                <el-checkbox
                  v-model="element.checked"
                  :label="element[props.label]"
                  @change="onChangeCheck(element, -1)"
                >
                  <div class="name ellipsis" :title="element[props.label]">
                    {{ element[props.label] }}
                  </div>
                </el-checkbox>
                <i class="iconfont icon-liebiao move-btn" title="可上下移动排序"> </i>
              </div>
            </template>
          </Draggable>
        </template>
        <el-empty v-else :image-size="80"></el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "@vue/runtime-core";
import Draggable from "vuedraggable";

const thisProps = defineProps({
  // 选中的数据，显示在bottom
  value: {
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

const emit = defineEmits(["update:value", "change", "sort-top", "sort-bottom"]);

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
  const { value, data, props } = thisProps;
  if (!value.length) {
    topDatas.value = JSON.parse(JSON.stringify(...data));
    bottomDatas.value = [];
  } else {
    data.forEach((e) => {
      // 是否选中数据
      if (value.indexOf(e[props.key]) >= 0) {
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
  const values = bottomDatas.value.map((e) => e[props.key]);
  emit("update:value", values);
  emit("change", values);
};

// 上方元素移动
const onChangeTopSort = (event) => {
  emit("sort-top", topDatas.value);
};

// 下方元素移动
const onChangeBottomSort = (event) => {
  emit("sort-bottom", bottomDatas.value);
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

  &__content{
    height: 210px;
    overflow-y: auto;
  }

  &-item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      max-width: 200px;
    }

    .move-btn {
      cursor: move;
    }
  }
}
</style>
