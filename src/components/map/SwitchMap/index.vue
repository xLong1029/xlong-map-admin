<template>
  <div class="switch-map" :class="{ 'has-operate-panel': mapOperatePanel }">
    <div class="maps-list-wrapper">
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
  </div>
</template>

<script setup>
import { ref, inject } from "@vue/runtime-core";
import imageImg from "assets/images/map-1.jpg";
import vectorImg from "assets/images/map-2.jpg";
import terrainImg from "assets/images/map-3.jpg";
import common from "common/index.js";

const props = defineProps({
  // 是否显示地图操作栏
  mapOperatePanel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["change-basemap", "map-set-view-scale"]);

const { dispatchMapEvent } = common();

// 地图底图
const basemap = inject("getBasemap");

const maps = ref([
  {
    basemap: "hybrid",
    name: "影像",
    img: imageImg,
  },
  {
    basemap: "vector",
    name: "矢量",
    img: vectorImg,
  },
  {
    basemap: "terrain",
    name: "地形",
    img: terrainImg,
  },
]);

// 切换底图
const onChangeMap = ({ basemap }) => {
  emit("change-basemap", basemap);

  if (basemap === "terrain") {
    emit("map-set-view-scale", { scale: 30000 });
  }
  dispatchMapEvent("onSwitchBasemap", {
    basemap,
  });
};
</script>
<style lang="scss" scoped>
.switch-map {
  position: absolute;
  bottom: 10px;
  right: 15px;
  background: #fff;
  border-radius: $map-border-radius;
  box-shadow: $map-box-shadow;
  width: 120px;
  overflow: hidden;
  transition: 0.5s;

  &:hover {
    width: 274px;
  }

  &.has-operate-panel {
    right: 65px;
  }
}

.maps-list {
  &-wrapper {
    margin: 8px;
    overflow: hidden;
  }

  float: left;
  width: 274px;
  height: 50px;

  &-item {
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 4px;
    position: relative;
    overflow: hidden;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      .maps-list-item__img {
        border: 1px solid $primary-color;
      }

      .maps-list-item__name {
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
      border-radius: 4px 0 0 0;
      position: absolute;
      text-align: center;
      // width: 100%;
      right: 0;
      bottom: 0;
      font-size: 12px;
      padding: 2px 4px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
