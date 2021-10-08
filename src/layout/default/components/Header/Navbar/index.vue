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
import { getLocalS } from "utils";
import { ref, computed } from "@vue/runtime-core";
import common from "common";
import NavItem from "./NavItem.vue";

const { store, route } = common();

const theme = computed(() => store.getters.theme)

const variables = ref({
  menuBg: "transparent",
  menuText: "#333333",
  menuActiveText: theme
})

const activeMenu = computed(() => {
  const { meta, path } = route;

  if (meta.activeMenu) {
    return meta.activeMenu;
  }

  return path;
});

const permissionRoutes = computed(() => store.getters.permissionRoutes);

console.log(permissionRoutes);
</script>

<style lang="scss" scoped>
@mixin nav-list-item-hover {
  color: $menuActiveText !important;
  background: transparent !important;
}

.navbar-container {
  background: #ffffff;
  width: 100%;
  overflow: hidden;
}

// 导航设置
.nav-list {
  &-container {
    position: relative;
    margin-top: 8px;
    min-width: 500px;

    :deep(.el-menu) {
      background: transparent;
    }

    :deep(.el-menu-item) {
      font-size: 16px;
      color: $menuText;
      display: flex;
      align-items: center;
      font-weight: bold;

      &:focus {
        background: transparent !important;
      }

      &:hover {
        @include nav-list-item-hover;
      }

      // 一级菜单高亮设置
      &.is-active {
        color: $menuActiveText !important;
      }
    }

    :deep(.el-sub-menu) {
      font-size: 16px;
      font-weight: bold;

      // 二级菜单高亮设置
      &.is-active {
        .el-sub-menu__title {
          color: $menuActiveText !important;
        }
      }
    }

    :deep(.el-sub-menu__title) {
      font-size: 16px;
    }

    :deep(.el-menu--horizontal) {
      border-bottom: none;
    }

    :deep(.el-sub-menu__title) {
      color: $menuText;

      &:focus {
        background: transparent !important;
      }

      &:hover {
        @include nav-list-item-hover;
      }

      span {
        margin-right: 5px;
      }
    }

    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
}
</style>
