<template>
  <div v-if="!item.hidden">
    <div
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
      class="nav-list-menu__item"
      :class="{ right: item.right }"
    >
      <el-menu-item
        @click="handleLink(onlyOneChild)"
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i v-if="onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></i
        ><span>{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </div>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path, true, item)"
      @click="toPath(item)"
      class="nav-list-menu__item"
      :class="{ right: item.right }"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
        <i class="el-icon-caret-bottom"></i>
      </template>
      <nav-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nav-list-submenu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
// 解决vite无法使用Path的问题
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const router = useRouter();

const onlyOneChild = ref(null);

// 是否只有一个子集
const hasOneShowingChild = (children = [], parent) => {
  if (!children || !children.length) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

// 解析路径
const resolvePath = (routePath, isSub, item) => {
  const { basePath } = props;

  // console.log(props.basePath, routePath);

  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath)) {
    return basePath;
  }

  if (isSub && item && item.redirect) {
    // console.log(basePath, item.redirect);
    return path.resolve(basePath, item.redirect);
  }

  return path.resolve(basePath, routePath);
};

// 二级菜单父级直接跳转链接
const toPath = (item) => {
  const { meta, path } = item;
  if (!meta.directLink) return;
  router.push({ path });
};

// 处理链接跳转
const handleLink = (item) => {
  const { externalUrl, path } = item;

  if (externalUrl) {
    window.open(externalUrl);
    return;
  }

  const url = resolvePath(path);
  router.push({ path: url });
};
</script>

<style lang="scss">
@mixin nav-list-item-hover {
  color: #fff !important;
  background: transparent !important;
}

@mixin nav-list-item-active {
  color: #fff !important;
  background: rgba(0, 0, 0, 0.1) !important;
}

.nav-list {
  &-container {
    .el-menu-item {
      // height: 40px !important;
      // line-height: 40px !important;
      font-size: 16px;

      .iconfont {
        font-size: 18px;
      }

      &.is-active {
        @include nav-list-item-active;

        &:hover {
          @include nav-list-item-active;
        }
      }

      &:hover {
        @include nav-list-item-hover;
      }
    }

    .el-menu--horizontal {
      border-bottom: none;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      background: transparent;
      color: $primary-color;
    }
  }
}
</style>
