<template>
  <div class="app-wrapper">
    <div v-if="fixedHeader" class="header-container fixed">
      <AppHeader />
    </div>
    <div class="main-container" :class="{ 'show-header': fixedHeader }">
      <AppMain />

      <RightPanel v-if="showSettings">
        <AppSettings />
      </RightPanel>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { AppMain, AppSettings, AppHeader } from "./components/index.js";
import RightPanel from "@/components/common/RightPanel/index.vue";

const store = useStore();

const showSettings = computed(() => store.getters.showSettings);

const fixedHeader = computed(() => store.getters.fixedHeader);
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: $header-height;
  background: $primary-color;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // border-bottom:1px solid #e4e7ed;

  &.fixed {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
  }
}

.main-container {
  height: 100vh;
  overflow: hidden;

  &.show-header {
    padding-top: $header-height;
  }
}
</style>
