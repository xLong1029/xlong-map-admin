<template>
  <el-dialog
    :title="title"
    :modelValue="visible"
    @close="onClose()"
    :width="850"
    custom-class="account-store-dialog"
  >
    <el-form
      v-loading="infoLoading"
      element-loading-text="加载中，请稍后..."
      :model="form"
      :rules="rules"
      ref="storeForm"
      label-width="115px"
    >
      <el-row :gutter="20">
        <template v-if="row">
          <el-col :span="12">
            <el-form-item label="用户编号：">{{ row.userId }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：">{{ row.createdTime }}</el-form-item>
          </el-col>
        </template>
        <el-col :span="12">
          <el-form-item label="真实姓名：" prop="realname"
            ><el-input
              placeholder="请输入真实姓名"
              clearable
              v-model="form.realname"
              @keyup.enter="onSubmit()"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态：" prop="enabledState">
            <el-switch
              v-model="form.enabledState"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码：" prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮箱：" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入电子邮箱"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="职位：" prop="job">
            <el-select
              v-model="form.job"
              placeholder="请选择职位"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in jobList"
                :key="'job' + index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="专业领域：" prop="profession">
            <el-checkbox-group v-model="form.profession">
              <el-checkbox
                v-for="(item, index) in professionList"
                :key="'profession' + index"
                :label="item.name"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="onClose()">取消</el-button>
      <el-button type="primary" @click="onSubmit()" :loading="submitLoading"
        >确认{{ row ? "编辑" : "新增" }}</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup>
import {
  ref,
  reactive,
  nextTick,
  watch,
  toRaw
} from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// 表单
import formJs from "common/form.js";
// Api
import Api from "api/account-manage/index.js";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  row: {
    type: Object,
    default: () => ({
      userId: null,
      createdTime: null,
      realname: null,
      gender: null,
      mobile: null,
      email: null,
      job: null,
      profession: [],
      enabledState: true,
    }),
  },
  jobList: {
    type: Array,
    default: () => [],
  },
  professionList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "submit"]);

const { validForm, validateMobile, validateEmail } = formJs();

const title = ref("信息详情");

const storeForm = ref();

const defaultData = reactive({
  realname: null,
  createdTime: null,
  gender: "男",
  mobile: null,
  email: null,
  job: "",
  profession: [],
  enabledState: true,
});

const form = reactive({
  userId: null,
  realname: null,
  createdTime: null,
  gender: "男",
  mobile: null,
  email: null,
  job: "",
  profession: [],
  enabledState: true,
});

const rules = reactive({
  realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  mobile: [
    {
      required: true,
      validator: validateMobile,
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      validator: validateEmail,
      trigger: "blur",
    },
  ],
  job: [{ required: true, message: "请选择职位", trigger: "change" }],
  enabledState: [
    { required: true, message: "请选择用户状态", trigger: "change" },
  ],
});

const submitLoading = ref(false);

const infoLoading = ref(false);

watch(
  () => props.visible,
  (val) => {
    if (val) {
      const { row } = props;
      if (row) {
        title.value = "用户信息";

        for (let i in form) {
          form[i] = row[i];
        }

        form.userId = row.userId;
        form.profession = row.profession;
        form.enabledState = row.enabledState === 1 ? true : false;
      } else {
        title.value = "新增用户";

        for (let i in form) {
          form[i] = defaultData[i];
        }
      }
    }

    nextTick(() => {
      storeForm.value.clearValidate();
    });
  }
);

const onClose = () => {
  emit("close", false);
};

const onSubmit = async () => {
  const valid = await validForm(storeForm.value, "信息填写有误，请检查");

  if (valid) {
    submitLoading.value = true;

    let params = {...toRaw(form)};
    params.enabledState = params.enabledState ? 1 : -1;

    const { row } = props;

    if (row) {
      Api.EditAccount(params)
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            ElMessage.success("编辑成功");
            emit("submit");
            onClose();
          }
          else ElMessage.error(message);
        })
        .catch((err) => ElMessage.error("操作失败"))
        .finally(() => (submitLoading.value = false));
    } else {
      Api.AddAccount(params)
        .then((res) => {
          const { code, message } = res;
          if (code == 200) {
            ElMessage.success("新增成功");
            emit("submit");
            onClose();
          } else ElMessage.error(message);
        })
        .catch((err) => ElMessage.error("操作失败"))
        .finally(() => (submitLoading.value = false));
    }
  }
};
</script>
<style lang="scss">
.account-store-dialog {
  .el-dialog__body {
    padding: 10px 20px 0 10px;
  }
}
</style>
