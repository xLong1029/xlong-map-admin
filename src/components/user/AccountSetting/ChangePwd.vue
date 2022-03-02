<template>
  <el-form :model="form" :rules="rules" ref="changePwdForm" label-width="90px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        type="password"
        placeholder="请输入旧密码"
        clearable
        v-model="form.oldPassword"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        type="password"
        placeholder="请输入新密码"
        clearable
        v-model="form.newPassword"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="comfirmPassword">
      <el-input
        type="password"
        placeholder="请输入确认密码"
        clearable
        v-model="form.comfirmPassword"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" :loading="submitLoading" @click="onSubmit()"
        >保存修改</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, toRaw, onMounted } from "@vue/runtime-core";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
// 表单
import formJs from "common/form.js";
// 过滤器
import filter from "common/filter";
// 通用模块
import common from "common";
// 校验
import { validPassword, isEqual } from "utils/validate";
// Api
import Api from "api/user/index.js";

const { store, toPage } = common();
const { validForm } = formJs();

// 表单
const changePwdForm = ref();

const form = reactive({
  oldPassword: "",
  newPassword: "",
  comfirmPassword: "",
});

// 校验
const validateNewPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入新密码"));
  } else if (!validPassword(value)) {
    callback(new Error("密码至少为6位，必须包含字母和数字"));
  } else {
    callback();
  }
};
const validateComfirPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入确认密码"));
  } else if (!isEqual(value, form.newPassword)) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};

// 表单规则
const rules = reactive({
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [{ required: true, validator: validateNewPassword, trigger: "blur" }],
  comfirmPassword: [
    { required: true, validator: validateComfirPassword, trigger: "blur" },
  ],
});

const submitLoading = ref(false);

onMounted(() => {
  resetForm();
});

// 重置表单
const resetForm = () => {
  form.oldPassword = "";
  form.newPassword = "";
  form.comfirmPassword = "";
};

// 保存修改
const onSubmit = async () => {
  const valid = await validForm(changePwdForm.value, "信息填写有误，请检查");

  if (valid) {
    submitLoading.value = true;

    const params = toRaw(form);

    Api.ChangePwd(params)
      .then(async (res) => {
        const { code, message } = res;
        if (code == 200) {
          try {
            await store.dispatch("user/logout");
            await store.dispatch("permission/generateRoutes", null);
            // 清除记住的用户名和密码
            Cookies.remove("username");
            Cookies.remove("password");
            ElMessage.success("密码修改成功！请重新登录");

            toPage("/login");
          } catch (err) {
            console.log(err);
          }
        } else {
          ElMessage.error(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (submitLoading.value = false));
  }
};
</script>
<style lang="scss">
.account-setting-dialog {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
