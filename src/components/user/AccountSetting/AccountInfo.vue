<template>
  <el-form
    v-loading="infoLoading"
    element-loading-text="加载中，请稍后..."
    :model="form"
    :rules="rules"
    ref="infoForm"
    label-width="90px"
  >
    <el-form-item label="账户" prop=""
      ><span>{{ isNull(user.username) }}</span> <span class="ml-10"><RoleTag /></span
    ></el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input
        placeholder="请输入昵称"
        clearable
        v-model="form.nickName"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input
        placeholder="请输入真实姓名"
        clearable
        v-model="form.realName"
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
import { computed, reactive, ref, toRaw } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// 表单
import formJs from "common/form.js";
// 过滤器
import filter from "common/filter";
// 通用模块
import common from "common";
// 组件
import RoleTag from "components/user/RoleTag/index.vue";
// 工具
import { strToArr } from "utils";
// Api
import Api from "api/user/index.js";

const { store } = common();
const { validForm, validateRealName } = formJs();
const { isNull } = filter();

const user = computed(() => store.getters.user);
const token = computed(() => store.getters.token);

// 表单
const infoForm = ref();

const form = reactive({
  nickName: "",
  realName: "",
});

// 表单规则
const rules = reactive({
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  realName: [{ required: true, validator: validateRealName, trigger: "blur" }],
});

const submitLoading = ref(false);

const infoLoading = ref(false);

onMounted(() => {
  resetForm();
  getProfile();
});

// 重置表单
const resetForm = () => {
  form.nickName = user.value.nickName;
  form.realName = user.value.realName;
};

// 保存修改
const onSubmit = async () => {
  const valid = await validForm(infoForm.value, "信息填写有误，请检查");

  if (valid) {
    submitLoading.value = true;

    const params = toRaw(form);
    Api.EditProfile(params)
      .then(async (res) => {
        const { code, message } = res;
        if (code == 200) {
          getProfile();
          ElMessage.success("信息保存成功");
        } else {
          ElMessage.error(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (submitLoading.value = false));
  }
};

// 获取个人资料
const getProfile = () => {
  infoLoading.value = true;

  Api.GetUser()
    .then((res) => {
      const { code, data, message } = res;
      // 获取到数据
      if (code == 200) {
        const { nickName, realName, roles } = data;

        form.nickName = nickName;
        form.realName = realName;

        data.roles = strToArr(roles, ",")

        // 更新用户信息
        store.commit("user/SET_USER", data);
      } else {
        ElMessage.error(message);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => (infoLoading.value = false));
};
</script>
<style lang="scss">
.account-setting-dialog {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
