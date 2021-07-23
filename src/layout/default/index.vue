<template>
  <div class="app-wrapper">
    <div v-if="fixedHeader" class="header-container fixed">
      <app-header />
    </div>
    <div :class="['main-container', fixedHeader ? 'show-header' : '']">
      <app-main />
      
      <right-panel v-if="showSettings">
        <app-settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { AppMain, AppSettings, AppHeader } from "./components/index.js";
import RightPanel from "@/components/common/RightPanel/index.vue";

export default {
  name: "LayoutDefault",
  components: {
    AppMain,
    AppSettings,
    AppHeader,
    RightPanel,
  },
  setup() {
    const store = useStore();

    const showSettings = computed(() => store.getters.showSettings);

    const fixedHeader = computed(() => store.getters.fixedHeader);

    return {
      showSettings,
      fixedHeader
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: $header-height;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
