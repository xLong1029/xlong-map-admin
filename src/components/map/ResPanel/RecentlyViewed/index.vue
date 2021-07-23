<template>
  <div class="tab-recently-viewed-content">
    （{{ title }}）功能建设中，敬请期待...
  </div>
</template>

<script>
export default {
  name: "TabRecentlyViewed",

  props: {
    title: {
      type: String,
      default: "最近浏览",
    },
  },

  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.tab-recently-viewed-content {
  padding: 0 10px 10px 10px;
}
</style>
