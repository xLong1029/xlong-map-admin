<template>
  <div class="account-manage-container">
    <el-card class="overspread-page" shadow="never">
      <el-alert
        class="mb-20"
        title="这里只做功能演示，并非此系统登录的账户管理，均通过Mockjs模拟增、删、改、查等操作"
        type="info"
        show-icon
      ></el-alert>
      <!-- 筛选 -->
      <div class="operate-container">
        <el-form :model="filterParamsForm" :inline="true" class="form-container">
          <el-form-item>
            <el-input
              class="form-keyword"
              v-model.trim="filterParamsForm.keyword"
              clearable
              placeholder="请输入用户编号/真实姓名/手机号码/邮箱进行搜索"
              @clear="onSearch()"
              @keyup.enter="onSearch()"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="filterParamsForm.enabledState"
              placeholder="请选择用户状态"
              clearable
              @clear="onSearch()"
            >
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearch()"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <div v-if="roles.indexOf('admin') >= 0">
          <el-button type="primary" icon="el-icon-plus" @click="onAdd()"
            >新增账户</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="!selectList.length"
            :loading="delLoading"
            @click="onDel()"
            >批量删除</el-button
          >
        </div>
      </div>
      <!-- 表格 -->
      <DynamicTable
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
        @selection-change="getSelectList"
        @pagination="getList"
      >
        <template #before>
          <el-table-column
            v-if="roles.indexOf('admin') >= 0"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column width="50" label="序号" fixed align="center">
            <template v-slot="{ $index }">
              {{ $index + 1 + page.pageSize * (page.pageNo - 1) }}
            </template>
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
            v-if="roles.indexOf('admin') >= 0"
            prop="action"
            label="操作"
            fixed="right"
            width="150"
            align="center"
          >
            <template #default="{ row, $index }">
              <el-button type="text" icon="el-icon-edit" @click="onEdit(row, $index)"
                >编辑</el-button
              >
              <el-button
                class="delete-btn"
                type="text"
                icon="el-icon-delete"
                @click="onDelRow(row, $index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
      </DynamicTable>
    </el-card>
    <!-- 新增/编辑 -->
    <StoreDialog
      :visible="storeDialog.visible"
      :row="storeDialog.row"
      :job-list="jobList"
      :profession-list="professionList"
      @close="storeDialog.visible = false"
      @submit="getList(storeDialog.row ? page.pageNo : 1, page.pageSize)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
// 组件
import DynamicTable from "components/common/Table/DynamicTable.vue";
import StoreDialog from "./store.vue";
// 通用模块
import table from "common/table.js";
import common from "common";
// Api
import Api from "api/account-manage/index.js";

const { store, toPage } = common();
const {
  tableProps,
  listData,
  listLoading,
  page,
  setPage,
  selectList,
  getSelectList,
  clearSelect,
} = table();

const roles = computed(() => store.getters.roles);

const tableHeader = [
  {
    key: "userId",
    title: "用户编号",
    align: "center",
    width: 320,
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
    key: "createdTime",
    title: "创建时间",
    align: "center",
    width: 200,
  },
];

// 筛选条件
const filterParamsForm = reactive({
  keyword: "",
  enabledState: "",
});

// 批量删除loading
const delLoading = ref(false);

//  新增/编辑弹窗
const storeDialog = reactive({
  visigle: false,
  row: null,
});

const jobList = ref([]);
const professionList = ref([]);

onMounted(async () => {
  const jobListRes = await Api.GetJobList();
  if (jobListRes.code === 200) {
    jobList.value = jobListRes.data;
  }

  const professionListRes = await Api.GetProfessionList();
  if (professionListRes.code === 200) {
    professionList.value = professionListRes.data;
  }

  getList(1, page.pageSize);
});

// 获取列表内容
const getList = (pageNo, pageSize) => {
  listLoading.value = true;
  Api.GetAccList(filterParamsForm, pageNo, pageSize)
    .then((res) => {
      const { code, data, page, message } = res;
      if (code === 200) {
        const { list, page } = data;
        listData.value = list;
        console.log(data);
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
  getList(1, page.pageSize);
};

// 新增
const onAdd = () => {
  storeDialog.visible = true;
  storeDialog.row = null;
};

// 删除
const onDel = (showLoading = true) => {
  const ids = selectList.value.map((e) => e.userId);
  const names = selectList.value.map((e) => e.realname);
  
  ElMessageBox.confirm(`确定删除用户【${names}】吗？`, "温馨提示", {
    confirmButtonText: "确定",
    type: "warning",
  })
    .then(() => {
      delLoading.value = true;
      Api.DeleteAcc(ids)
        .then((res) => {
          const { code, message } = res;
          if (code === 200) {
            ElMessage.success("删除成功");
            getList(1, page.pageSize);
            clearSelect();
          } else {
            ElMessage.error(message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => (delLoading.value = false));
    })
    .catch((err) => console.log(err));
};

// 编辑
const onEdit = (row, index) => {
  storeDialog.visible = true;
  storeDialog.row = row;
};

// 删除一行
const onDelRow = (row, index) => {
  clearSelect();
  selectList.value.push(row);
  onDel(false);
};

// 设置表格样式
const setTableRowClassName = ({ row }) => {
  return row.enabledState === -1 ? "is-disabled" : null;
};
</script>

<style lang="scss" scoped>
.account-manage-container {
  :deep(.el-table tr.is-disabled) {
    background: #f8f8f8;
    color: #b5b5b5;
  }

  .delete-btn {
    color: $red;
  }
}

.form-keyword {
  min-width: 400px;
}

.operate-container {
  display: flex;
  justify-content: space-between;
}
</style>
