<template>
  <div class="navbar-container">
    <!-- 导航 -->
    <div class="nav-list-container">
      <el-menu
        :default-active="activeMenu"
        class="nav-list"
        mode="horizontal"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
      >
        <NavItem
          class="nav-list-menu"
          v-for="(route, index) in permissionRoutes"
          :key="'route.path' + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "@vue/runtime-core";
import common from "common";
import NavItem from "./NavItem.vue";

const { store, route } = common();

const variables = ref({
  menuBg: "transparent",
  menuText: "#ffffff",
  menuActiveText: "#ffffff"
})

const activeMenu = computed(() => {
  const { meta, path } = route;

  if (meta.activeMenu) {
    return meta.activeMenu;
  }

  return path;
});

const permissionRoutes = computed(() => store.getters.permissionRoutes);
</script>

<style lang="scss" scoped>
@mixin nav-list-item-hover {
  color: $primary-color !important;
  background: transparent !important;
}

.navbar-container {
  background: transparent;
  // width: 100%;
 
  overflow: hidden;
}

// 导航设置
.nav-list {
  &-container {
    
    position: relative;
    min-width: 500px;
  }
}
</style>
