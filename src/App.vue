<template>
  <!-- <el-config-provider :locale="locale"> -->
    <div id="app" v-loading="sysLoading" element-loading-text="系统初始化，请稍后...">
      <router-view />
    </div>
  <!-- </el-config-provider> -->
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { logInfo, getLocalS } from "utils";
import common from "common";
import themeJs from "common/theme.js";

export default {
  setup() {
    const { store, changeSettings } = common();
    const { changeTheme } = themeJs();

    // 通过计算属性获取store的值
    const currentEnv = computed(() => store.getters.currentEnv);
    const sysLoading = computed(() => store.getters.sysLoading);

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

    return {
      sysLoading,
      locale,
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
