<template>
  <div
    id="appMain"
    class="app-main"
    :class="{ 'show-header': fixedHeader }"
    v-loading="pageLoading"
    element-loading-text="加载中，请稍后..."
  >
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// 通用方法
import common from "common";
import { computed } from "@vue/runtime-core";

const { pageLoading, store } = common();

const fixedHeader = computed(() => store.getters.fixedHeader);
</script>

<style lang="scss" scoped>
.app-main{
  height: 100vh;

  &.show-header {
    height: calc(100vh - #{$header-height});
  }
}

</style>
