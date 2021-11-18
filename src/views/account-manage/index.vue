<template>
  <div class="account-manage-container">
    <el-card class="overspread-page" shadow="never">
      <DynamicTable
        class="mt-20"
        v-loading="listLoading"
        element-loading-text="加载中，请稍等..."
        :table-header="tableHeader"
        :table-data="listData"
        :default-props="tableProps"
        :row-class-name="setTableRowClassName"
        :show-pagination="true"
        :total="page.total"
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :page-sizes="page.pageSizes"
        @pagination="getList"
      >
        <template #before>
          <el-table-column width="50" label="序号" fixed="" align="center">
            <template v-slot="{ $index }">{{
              $index + 1 + page.pageSize * (page.pageNo - 1)
            }}</template>
          </el-table-column>
        </template>
        <template #after>
          <el-table-column
            prop="enabledState"
            label="状态"
            width="100"
            fixed="right"
            align="center"
          >
            <template #default="{ row }">
              <el-tag v-if="row.enabledState === 1" type="success">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            fixed="right"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </DynamicTable>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// 组件
import DynamicTable from "components/common/Table/DynamicTable.vue";
// 通用模块
import table from "common/table.js";
import common from "common";
// Api
import Api from "api/account-manage/index.js";

const { store, toPage } = common();
const { tableProps, listData, listLoading, page, setPage } = table();

const tableHeader = [
  {
    key: "objectId",
    title: "用户编号",
    align: "center",
    width: 100,
    fixed: true,
  },
  {
    key: "realname",
    title: "真实姓名",
    align: "center",
    width: 200,
  },
  {
    key: "gender",
    title: "性别",
    align: "center",
  },
  {
    key: "mobile",
    title: "手机号码",
    align: "center",
    width: 150,
  },
  {
    key: "email",
    title: "邮箱",
    align: "center",
    width: 200,
  },
  {
    key: "job",
    title: "职位",
    align: "center",
  },
  {
    key: "createdAt",
    title: "创建时间",
    align: "center",
    width: 200,
  },
];

// 搜索关键词
const key = ref(null);

onMounted(() => {
  getList(1, 10);
});

// 获取列表内容
const getList = (pageNo, pageSize, Keyword = "") => {
  listLoading.value = true;

  Api.GetAccList(null, pageNo, pageSize)
    .then((res) => {
      const { code, data, page, message } = res;
      console.log(res);
      if (code === 200) {
        listData.value = data;
        setPage({ ...page });
      } else {
        ElMessage.error(message);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => (listLoading.value = false));
};

// 搜索
const onSearch = () => {
  getList(1, 10, key.value);
};

// 设置表格样式
const setTableRowClassName = ({ row }) => {
  return row.enabledState === -1 ? "is-disabled" : null;
};
</script>

<style lang="scss" scoped>
.account-manage-container {
  :deep(.el-table tr.is-disabled) {
    background: #f2f2f2;
    color: #b5b5b5;
  }
}
</style>
