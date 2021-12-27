<template>
  <!-- eslint-disable -->
  <div class="dynamic-table-container">
    <el-table
      ref="table"
      :data="tableData"
      :max-height="tableHeight"
      :row-class-name="rowClassName"
      :empty-text="emptyText"
      :border="border"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <template v-if="tableHeader.length">
        <slot name="before" />
        <template v-for="(item, index) in tableHeader" :key="'columns' + index">
          <el-table-column
            :fixed="item.fixed"
            :type="item.type"
            :align="item.align"
            :header-align="item.headerAlign"
            :prop="item[defaultProps.prop]"
            :label="item[defaultProps.label]"
            :show-overflow-tooltip="true"
            :width="item.width"
          ></el-table-column>
        </template>
      </template>
      <slot name="after" />
    </el-table>
    <!-- 分页 -->
    <Pagination
      class="page-list mt-20"
      v-show="showPagination"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="limit"
      :pageSizes.sync="pageSizes"
      :auto-scroll="false"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import Pagination from "components/common/Pagination/index.vue";

const props = defineProps({
  // 表格表头, 必须保留一个值，否则无法形成滚动
  tableHeader: {
    type: Array,
    default: () => [
      {
        prop: "objectId",
        label: "用户编号",
        fixed: true
      }
    ]
  },
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  // 表格高度
  tableHeight: {
    type: String || Number,
    default: "auto"
  },
  // 判断是否有详情可显示
  hasDetail: {
    type: Boolean,
    default: false
  },
  // 是否显示页码
  showPagination: {
    type: Boolean,
    default: false
  },
  // 当前页码
  pageNo: {
    type: Number,
    default: 1
  },
  // 每页记录条数
  pageSize: {
    type: Number,
    default: 1
  },
  // 当前页码
  pageSizes: {
    type: Array,
    default() {
      return [20, 30, 50, 80];
    }
  },
  // 总数
  total: {
    // required: true,
    type: Number,
    default: 0
  },
  // 属性配置
  defaultProps: {
    type: Object,
    default: () => ({
      prop: "prop",
      label: "label"
    })
  },
  // 行样式类名
  rowClassName: {
    type: Function || String
  },
  // 空数据时显示的文本内容
  emptyText: {
    type: String
  },
  // 是否带有纵向边框
  border: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits([
  "pagination",
  "selection-change",
  "update:pageNo",
  "update:pageSize"
]);

const currentPage = computed({
  get() {
    return props.pageNo;
  },
  set(val) {
    emit("update:pageNo", val);
  }
});

const limit = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit("update:pageSize", val);
  }
});

// 页码切换时触发，返回当前页码和每页记录条数
const handlePageChange = (page, pageSize) => {
  emit("pagination", page ? page : 1, pageSize);
};

// 选择框切换时触发，返回所有选项
const handleSelectionChange = selection => {
  emit("selection-change", selection);
};
</script>

<style lang="scss" scoped>
.dynamic-table-container {
  .page-list {
    text-align: center;
    width: 100%;
  }
}
</style>
