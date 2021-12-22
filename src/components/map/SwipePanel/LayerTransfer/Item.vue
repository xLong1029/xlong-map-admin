<template>
  <div>
    <el-checkbox
      v-model="data.checked"
      :label="data.title"
      @change="onChangeCheck()"
    >
      <div class="name ellipsis" :title="data.title">
        {{ data.title }}
      </div>
    </el-checkbox>
    <div class="operate">
      <el-button type="primary" size="mini" icon="el-icon-top"></el-button>
      <el-button type="primary" size="mini" icon="el-icon-bottom"></el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "@vue/runtime-core";

const props = defineProps({
  // 数据
  data: {
    type: Object,
    default: {
      checked: false,
      title: "名称",
    },
  },
  // 索引
  index: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(["on-click-help", "on-click-close"]);

// 勾选下方元素
const onChangeCheck = (index) => {
    emit("on-change", data, index);
};
</script>

<style lang="scss" scoped>
.transfer {
  &-top,
  &-bottom {
    height: 250px;
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

  &-item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      max-width: 200px;
    }
  }
}
</style>
