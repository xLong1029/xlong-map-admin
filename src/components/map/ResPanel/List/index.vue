<template>
  <div class="tab-list-content">（{{ title }}）功能建设中，敬请期待...</div>
</template>

<script setup>
import { defineProps } from "@vue/runtime-core";

const props = defineProps({
  title: {
    type: String,
    default: "资源列表",
  },
});
</script>

<style lang="scss" scoped>
.tab-list-content {
   padding: 0 10px 10px 10px;
}
</style>
