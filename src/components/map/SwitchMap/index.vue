<template>
  <div
    :class="[
      'switch-map',
      mapResPanel ? 'has-map-res-panel' : '',
      foldMapResPanel ? 'layer-fold' : '',
      mapBottomCoord ? 'has-bottom-coord' : '',
    ]"
  >
      <ul class="maps-list">
        <li
          class="maps-list-item"
          :class="activeMap === index ? 'active' : ''"
          v-for="(item, index) in maps"
          :key="'map' + index"
          @click="onChangeMap(item, index)"
        >
          <img class="maps-list-item__img" :src="item.img" />
          <span class="maps-list-item__name">{{ item.name }}</span>
        </li>
      </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import common from "common";
import hybridImg from "assets/images/map-3.png";
import topoVectorImg from "assets/images/map-1.png";

export default {
  name: "SwitchMap",

  props: {
    // 是否显示地图资源面板
    mapResPanel: {
      type: Boolean,
      default: true,
    },
    // 地图资源面板是否折叠
    foldMapResPanel: {
      type: Boolean,
      default: true,
    },
    // 是否显示地图底部信息
    mapBottomCoord: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    const { dispatchMapEvent } = common();

    const maps = ref([
      {
        basemap: "hybrid",
        name: "卫星地图",
        img: hybridImg,
      },
      {
        basemap: "topo-vector",
        name: "电子地图",
        img: topoVectorImg,
      },
    ]);

    const activeMap = ref(0);

    // 切换底图
    const onChangeMap = ({ basemap }, index) => {
      activeMap.value = index;
      dispatchMapEvent("onSwitchMap", {
        basemap,
      });
    };

    return {
      maps,
      activeMap,
      onChangeMap,
    };
  },
};
</script>
<style lang="scss" scoped>
.switch-map {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  box-shadow: $map-box-shadow;
  padding: 10px 0;

  &.has-map-res-panel {
    left: 430px;

    &.layer-fold {
      left: 15px;
    }
  }

  &.has-bottom-coord {
    bottom: calc(#{$bottom-height} + 15px);
  }

  // &__title {
  //   padding: 15px;
  // }

  // &__content {
  //   padding: 0 5px 15px 5px;
  // }
}

.maps-list {
  display: flex;
  justify-content: space-between;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 10px;

    &.active {
      .maps-list-item__img {
        border: 2px solid $primary-color;
      }

      .maps-list-item__name {
        color: $primary-color;
      }
    }

    &__img {
      width: 48px;
      height: 48px;

      border-radius: 8px;
      overflow: hidden;
    }
    &__name {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>
