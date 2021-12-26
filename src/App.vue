<template>
  <el-config-provider :locale="locale">
    <div
      id="app"
      v-loading="sysLoading"
      :element-loading-text="
        innerIframe ? '窗口初始化，请稍后...' : '系统初始化，请稍后...'
      "
    >
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from "@vue/runtime-core";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { logInfo, getLocalS, getUrlQuery } from "utils";
import common from "common";
import themeJs from "common/theme.js";

const { store, changeSettings } = common();
const { changeTheme } = themeJs();

// 通过计算属性获取store的值
const currentEnv = computed(() => store.getters.currentEnv);
const sysLoading = computed(() => store.getters.sysLoading);
const innerIframe = ref(getUrlQuery("innerIframe", window.location.href));

const locale = zhCn;

console.log(`current environment is ${currentEnv.value}`);

if (window.performance.navigation.type === 1) {
  logInfo("页面被刷新");
} else {
  logInfo("首次进入页面");
}

onMounted(() => {
  if (getLocalS("settings")) {
    const settings = JSON.parse(getLocalS("settings"));

    if (settings.theme) {
      changeTheme(settings.theme);
      changeSettings("theme", settings.theme);
    }
  }
});
</script>

<style>
#app {
  max-height: 100vh !important;
  height: 100vh !important;
}
</style>
