<template>
  <div :class="['map-res-panel', foldMapInfoPanel ? 'fold' : 'unfold']">
    <div class="map-res-panel__title" @click="setContentVisible(!foldMapInfoPanel)">
      <div><i class="iconfont icon-tucengxuanze mr-10"></i><span>地图资源</span></div>
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      v-if="!foldMapInfoPanel"
      class="map-res-panel__content"
      :class="{ 'show-header': fixedHeader, 'has-bottom-coord': mapBottomCoord }"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="'tab' + index"
          :label="item.label"
          :name="item.name"
        >
          <component :is="item.component" :title="item.label" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "@vue/runtime-core";
// 组件
import List from "./List/index.vue";
import MyFavorites from "./MyFavorites/index.vue";

export default {
  name: "ResPanel",

  props: {
    // 是否折叠地图资源面板
    foldMapInfoPanel: {
      type: Boolean,
      default: false,
    },
    // 是否显示地图底部信息
    mapBottomCoord: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    List,
    MyFavorites,
  },

  setup(props, { emit }) {
    // 是否显示系统固定头部
    const fixedHeader = inject("getFixedHeader");

    // 当前激活Tab的name
    const activeName = ref("list");

    const tabs = ref([
      {
        name: "list",
        label: "资源列表",
        component: "List",
      },
      {
        name: "myFavorites",
        label: "我的收藏",
        component: "MyFavorites",
      },
    ]);

    // 收起面板
    const setContentVisible = (val) => {
      emit("click-fold", val);
    };

    return {
      fixedHeader,
      activeName,
      tabs,
      setContentVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
.map-res-panel {
  position: absolute;
  z-index: 99;
  top: 15px;
  left: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  width: 400px;

  overflow: hidden;
  box-shadow: $map-box-shadow;

  &.fold {
    width: 200px;

    .el-icon-caret-top {
      transition: 0.2s;
      transform-origin: center;
      transform: rotateZ(180deg);
    }
  }

  &__title {
    background: #ececec;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #535353;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .el-icon-caret-top {
      font-size: 20px;
      transition: 0.2s;
      transform-origin: center;
      transform: rotateZ(0deg);
    }
  }

  &__content {
    height: calc(100vh - 70px);

    &.show-header {
      height: calc(100vh - #{$header-height} - 70px);

      &.has-bottom-coord {
        height: calc(100vh - #{$header-height} - #{$bottom-height} - 70px);
      }
    }

    &.has-bottom-coord {
      height: calc(100vh - #{$bottom-height} - 70px);
    }

    :deep(.el-tabs__nav-scroll) {
      width: 248px;
      margin: 0 auto;
    }

    :deep(.el-tabs__item) {
      height: 50px;
      line-height: 50px;
      color: #999;

      &.is-active {
        color: $primary-color;
      }
      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
