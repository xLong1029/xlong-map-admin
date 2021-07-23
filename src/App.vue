<template>
  <div id="app" v-loading="sysLoading" element-loading-text="系统初始化，请稍后...">
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logInfo, getLocalS } from "utils";
import common from "common";

export default {
  setup() {
    const { store, changeSettings } = common();

    // 通过计算属性获取store的值
    const currentEnv = computed(() => store.getters.currentEnv);
    const sysLoading = computed(() => store.getters.sysLoading);

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
          // 全局修改自定义的$primary-color
          document
            .getElementsByTagName("body")[0]
            .style.setProperty("--primaryColor", settings.theme);

          // 解决更换主题无效的问题
          setTimeout(() => {
            changeSettings("theme", settings.theme);
          }, 800);
        }
      }
    });

    return {
      sysLoading,
    };
  },
};
</script>

<style lang="scss">
#app {
  max-height: 100vh !important;
  height: 100vh !important;
}
</style>
