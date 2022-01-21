<template>
  <div :class="{ hidden: hidden }" class="pagination-container clearfix">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { scrollTo } from "@/utils/scroll-to";
const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [20, 30, 50, 80];
    }
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["pagination", "selection-change", "update:page", "update:limit"]);

const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  }
});

const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  }
});

// 切换数据条数配置时触发，返回当前页码和数据条数
const handleSizeChange = val => {
  emit("pagination", currentPage.value, val);
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
};

// 切换页码时触发，返回当前页码和数据条数
const handleCurrentChange = val => {
  emit("pagination", val, pageSize.value);
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  /* background: #fff;
  padding: 20px 20px; */
}
.pagination-container.hidden {
  display: none;
}

.pagination-container {
  :deep(.el-pagination__editor.el-input .el-input__inner) {
    line-height: 28px;
  }
}

@media screen and (max-width: 992px) {
  .pagination-container {

    :deep(.el-pagination__sizes){
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .pagination-container {
    :deep(.el-pagination__total){
      display: none;
    }
  }
}

@media screen and (max-width: 640px) {
  .pagination-container {
    :deep(.el-pagination__jump){
      display: none;
    }
  }
}
</style>
