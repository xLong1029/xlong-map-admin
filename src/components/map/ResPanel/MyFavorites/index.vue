<template>
  <div class="tab-my-favorites-content">
    （{{ title }}）功能建设中，敬请期待...
  </div>
</template>

<script>
export default {
  name: "TabMyFavorites",

  props: {
    title: {
      type: String,
      default: "我的收藏",
    },
  },

  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.tab-my-favorites-content {
  padding: 0 10px 10px 10px;
}
</style>
