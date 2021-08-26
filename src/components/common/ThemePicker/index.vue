<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import { watch } from "@vue/runtime-core";
import themeJs from "common/theme.js";

export default {
  setup() {
    const { theme, defaultTheme, changeTheme } = themeJs();

    watch(
      () => defaultTheme.value,
      (val) => {
        theme.value = val;
      },
      {
        immediate: true,
      }
    );

    watch(
      () => theme.value,
      (val) => changeTheme(val)
    );

    return {
      theme,
    };
  },
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
