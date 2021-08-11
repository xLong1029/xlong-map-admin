<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login__header">
        <img :src="logo" class="logo" /><span class="title">{{ title }}</span>
      </div>
      <div class="login__content">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="0">
          <el-form-item prop="username">
            <el-input
              class="login__input"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="form.username"
              @keyup.enter="onSubmit()"
            >
            </el-input>
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
          <a class="forget-link blue" @click="onResetPwd">忘记密码?</a>
        </div>
        <el-button
          class="login__btn"
          type="primary"
          :loading="submitLoading"
          @click="onSubmit()"
          >登录</el-button
        >
      </div>
    </div>
    <div class="copyright">
      Copyright © {{ year }}
      <a class="link" target="blank" href="https://github.com/xLong1029/xlong-map-vue3">{{
        companyName
      }}</a>
      All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
// 通用模块
import common from "common";
// 表单
import formJs from "common/form.js";
// 工具
import { encrypt, decrypt } from "utils";
import { reactive, ref, computed, onMounted, watch, toRaw } from "@vue/runtime-core";
// logo图片
import logo from "assets/images/logo.png";

export default {
  name: "Login",

  setup() {
    const { showDevMessage, store, toPage } = common();
    const { validForm } = formJs();

    // 标题
    const title = computed(() => store.getters.sysTitle);

    // 记住密码
    const remeberPwd = ref(false);

    // copyright内容
    const year = "2021";
    const companyName = computed(() => store.getters.companyName);

    // 表单
    const formRef = ref();

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
      const valid = await validForm(formRef.value, "信息填写有误，请检查");

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
          ElMessage.error("用户名或者密码不正确");

          submitLoading.value = false;
        }
      }
    };

    // 忘记密码/重置密码
    const onResetPwd = () => {
      showDevMessage();
    };

    // 切换密码可见性
    const onSwitchPwdVisible = () => {
      pwdVisible.value = !pwdVisible.value;
    };

    return {
      logo,
      title,
      remeberPwd,
      submitLoading,
      year,
      companyName,
      formRef,
      form,
      rules,
      pwdVisible,
      onSubmit,
      onResetPwd,
      onSwitchPwdVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  &-container {
    position: relative;
    background-image: url("./../../assets/images/login-bg.svg");
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    min-height: 100vh;
  }
  &-wrapper {
    padding: 80px 0 32px 0;
    margin: 0 20px;
  }
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    .logo {
      height: 50px;
      margin-right: 15px;
    }

    .title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
  }

  &__content {
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  &__btn {
    width: 100%;
  }
}

.remember-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.copyright {
  color: rgba(0, 0, 0, 0.45);
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 24px;

  .link {
    color: $primary-color;
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
