<template>
  <div class="tab-list-content">（{{ title }}）功能建设中，敬请期待...</div>
</template>

<script>
export default {
  name: "TabList",

  props: {
    title: {
      type: String,
      default: "资源列表",
    },
  },

  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.tab-list-content {
   padding: 0 10px 10px 10px;
}
</style>
