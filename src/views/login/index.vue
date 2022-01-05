<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <div class="login-wrapper">
      <div class="login__header">
        <img :src="logoImg" class="logo" />
        <div class="title">{{ title }}</div>
        <div class="sub-english">XLONG JIALIDUN MAP MANAGEMENT SYSTEM</div>
      </div>
      <div class="login__content">
        <el-form :model="form" :rules="rules" ref="lofinForm" label-width="0">
          <el-form-item prop="username">
            <el-input
              class="login__input"
              placeholder="请输入用户名"
               prefix-icon="el-icon-user"
              v-model="form.username"
              @keyup.enter="onSubmit()"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login__input"
              placeholder="请输入密码"
              prefix-icon="el-icon-key"
              :type="pwdVisible ? 'text' : 'password'"
              v-model="form.password"
              @keyup.enter="onSubmit()"
            >
              <template #suffix>
                <i
                  @click="onSwitchPwdVisible"
                  class="iconfont mr-5 pointer"
                  :class="pwdVisible ? 'icon-kejian' : 'icon-bukejian'"
                ></i>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <div class="remember-wrapper">
          <el-checkbox v-model="remeberPwd" :disabled="submitLoading"
            >记住密码</el-checkbox
          >
          <a class="forget-link" @click="onResetPwd">忘记密码?</a>
        </div>
        <el-button
          class="login__btn"
          type="primary"
          :loading="submitLoading"
          @click="onSubmit()"
          >登录</el-button
        >
      </div>
      <div class="copyright">
        Copyright © {{ year }}
        <a class="link" target="blank" href="https://github.com/xLong1029">
          {{ companyName }}
        </a>
        All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import Cookies from "js-cookie";
// 通用模块
import common from "common";
// 表单
import formJs from "common/form.js";
// 工具
import { encrypt, decrypt } from "utils";
import { reactive, ref, computed, onMounted, watch, toRaw } from "@vue/runtime-core";
// logo图片
import logoImg from "assets/images/logo.png";

const { showDevMessage, store, toPage } = common();
const { validForm } = formJs();

// 标题
const title = computed(() => store.getters.sysTitle);

// 记住密码
const remeberPwd = ref(false);

// copyright内容
const year = "2022-2023";
const companyName = computed(() => store.getters.companyName);

// 表单
const lofinForm = ref();

const form = reactive({
  username: "",
  password: "",
});

const submitLoading = ref(false);

// 密码可见性
const pwdVisible = ref(false);

// 表单规则
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

watch(
  () => remeberPwd.value,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
    if (!newVal && Cookies.get("username")) {
      Cookies.remove("username");
      Cookies.remove("password");
    }
  }
);

onMounted(() => {
  // 判断本地存储用户名是否存在
  if (Cookies.get("username")) {
    // 获取本地存储的用户名和密码
    form.username = Cookies.get("username");
    form.password = decrypt(Cookies.get("password"));
    remeberPwd.value = true;
  }
});

// 登录
const onSubmit = async () => {
  const valid = await validForm(lofinForm.value, "信息填写有误，请检查");

  if (valid) {
    try {
      submitLoading.value = true;

      const params = toRaw(form);
      const userInfo = await store.dispatch("user/login", params);

      if (remeberPwd.value) {
        // 本地存储用户名和密码
        Cookies.set("username", form.username, {
          expires: 7,
        });
        Cookies.set("password", encrypt(form.password), {
          expires: 7,
        });
      }

      // 获取可通过的路由
      await store.dispatch("permission/generateRoutes", userInfo.roles);

      // 更新用户信息
      store.commit("user/SET_USER", userInfo);

      ElMessage.success(`尊敬的${userInfo.nickName}，欢迎使用${title.value}`);
      submitLoading.value = false;

      toPage("/map");
    } catch (err) {
      console.log(err);
      ElMessage.error("用户名或者密码不正确");

      submitLoading.value = false;
    }
  }
};

// 忘记密码/重置密码
const onResetPwd = () => {
  ElMessageBox.alert(
    `<p class="text-center">普通用户登录账号: 18888888888 密码: 666666</p>
      <p class="text-center">管理员登录账号: 17777075292 密码: 123456</p>
        <p class="text-center">超级管理员登录账号: 18376686974 密码: 123456</p>`,
    "演示账号密码",
    {
      dangerouslyUseHTMLString: true,
    }
  );
};

// 切换密码可见性
const onSwitchPwdVisible = () => {
  pwdVisible.value = !pwdVisible.value;
};
</script>
<style lang="scss" scoped>
.login {
  &-container {
    display: flex;
    justify-content: space-between;
  }

  &-bg {
    position: relative;
    width: 100%;
    background-image: url("./../../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
  }

  &-wrapper {
    padding: 10% 0 32px 0;
    min-height: 100vh;
    width: 720px;
    background: #168bf2;
    position: relative;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
    color: #fff;

    .logo {
      height: 80px;
      margin-right: 15px;
    }

    .title {
      margin-top: 10px;
      font-weight: 600;
      font-size: 24px;
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    }

    .sub-english {
      font-size: 12px;
      margin-top: 4px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  &__content {
    width: 100%;
    max-width: 340px;
    margin: 0 auto;

    :deep(.el-form-item__error){
      background: $red;
      color: #fff;
      padding: 5px;
      border-radius: 2px;
      margin-top: 1px;
      margin-left: 28px;
    }
  }

  &__input {
    :deep(.el-input__inner) {
      border-radius: 20px;
    }
  }

  &__btn {
    width: 100%;
    background: #a0d037;
    border-color: #a0d037;
    border-radius: 20px;
  }
}

.remember-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  .forget-link {
    color: #fff;
  }

  :deep(.el-checkbox){
    height: 30px;
  }

  :deep(.el-checkbox__label){
    color: #fff;
  }

  :deep(.el-checkbox__inner){
    border-radius: 10px;
    height: 20px;
    width: 20px;
  }

  :deep(.el-checkbox__input.is-checked){
    .el-checkbox__inner{
      background: #fff;

      &::after{
        color:$primary-color;
        border-color: $primary-color;
        width:4px;
        height: 10px;
        top: 2px;
        left:6px;
      }
    }
  }
}

.copyright {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);

  .link {
    color: #ffffff;
  }
}
</style>
<style lang="scss">
.login__input {
  .el-input__prefix {
    color: $primary-color;
  }
}
</style>
