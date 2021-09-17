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
        {{ onlyOneChild.meta.title }}
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
        <span>{{ item.meta.title }}</span
        ><i class="el-icon-caret-bottom"></i>
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
import path from "path";
import { isExternal } from "@/utils/validate";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ""
  }
});

const router = useRouter();

const onlyOneChild = ref(null);

// 是否只有一个子集
const hasOneShowingChild = (children = [], parent) => {
  if (!children || !children.length) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  const showingChildren = children.filter(item => {
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
    console.log(basePath, item.redirect);
    // return path.resolve(basePath, item.redirect);
  }

  console.log(path.resolve(basePath, routePath));

  return path.resolve(basePath, routePath);
};

// 二级菜单父级直接跳转链接
const toPath = item => {
  const { meta, path } = item;
  if (!meta.directLink) return;
  router.push({ path });
};

// 处理链接跳转
const handleLink = item => {
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
.nav-list {
  &-container {
    .nav-list {
      > div {
        float: left;
      }
      &__item {
        float: left;

        &.right {
          float: right;
        }
      }
    }
  }

  &-menu__item {
    .el-icon-caret-bottom {
      margin-top: -5px;
      margin-left: -5px;
      color: $menuText;
    }
  }

  // 二级菜单样式设置
  &-submenu {
    .nav-list-menu__item {
      .el-menu-item {
        &.is-active {
          color: $subMenuActiveText !important;
        }

        &:hover {
          background: #f8f8f8;
        }
      }

      // 二级菜单高亮
      &.is-active {
        .el-submenu__title {
          color: $subMenuActiveText !important;
        }
      }
    }
  }
}
</style>
