<template>
  <div class="switch-map" :class="{ 'has-operate-panel': mapOperatePanel }">
    <ul class="maps-list">
      <li
        class="maps-list-item"
        :class="{ active: basemap === item.basemap }"
        v-for="(item, index) in maps"
        :key="'map' + index"
        @click="onChangeMap(item)"
      >
        <img class="maps-list-item__img" :src="item.img" />
        <span class="maps-list-item__name">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, inject } from "@vue/runtime-core";
import hybridImg from "assets/images/map-3.jpg";
import topoVectorImg from "assets/images/map-1.jpg";
import common from "common/index.js";

export default {
  name: "Basemap",

  props: {
    // 是否显示地图操作栏
    mapOperatePanel: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const { dispatchMapEvent } = common();
    // 地图底图
    const basemap = inject("getBasemap");

    const maps = ref([
      {
        basemap: "hybrid",
        name: "影像",
        img: hybridImg,
      },
      {
        basemap: "vector",
        name: "矢量",
        img: topoVectorImg,
      },
      // {
      //   basemap: "terrain",
      //   name: "地形",
      //   img: topoVectorImg,
      // },
    ]);

    // 切换底图
    const onChangeMap = ({ basemap }) => {
      emit("change-basemap", basemap);
      dispatchMapEvent("onSwitchBasemap", {
        basemap,
      });
    };

    return {
      maps,
      basemap,
      onChangeMap,
    };
  },
};
</script>
<style lang="scss" scoped>
.switch-map {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  box-shadow: $map-box-shadow;
  padding: 10px 5px;

  &.has-operate-panel {
    right: 65px;
  }
}

.maps-list {
  display: flex;
  justify-content: space-between;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 5px;
    position: relative;
    overflow: hidden;

    &.active {
      .maps-list-item__img {
        border: 2px solid $primary-color;
      }

      .maps-list-item__name {
        color: #fff;
        text-shadow: none;
        background: $primary-color;
      }
    }

    &__img {
      width: 80px;
      height: 50px;

      border-radius: 4px;
      overflow: hidden;
    }
    &__name {
      border-radius: 0 0 4px 4px;
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: 0;
      font-size: 12px;
      padding: 2px;
      text-shadow: rgba(255, 255, 255, 0.85) 1px 0 0, rgba(255, 255, 255, 0.85) 0 1px 0,
        rgba(255, 255, 255, 0.85) -1px 0 0, rgba(255, 255, 255, 0.85) 0 -1px 0;
    }
  }
}
</style>
