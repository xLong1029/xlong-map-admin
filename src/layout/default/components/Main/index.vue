<template>
  <div
    id="appMain"
    class="app-main"
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

const { pageLoading } = common();
</script>

<style lang="scss" scoped>
</style>
