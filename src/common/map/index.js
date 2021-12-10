/*
 * 模块 : 地图相关
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-08-18
 * 版本 : version 1.0
 */

import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
// 配置
import { SPATIAL_REFERENCE_WKID } from "config/index.js";

export default function () {
  const store = useStore();

  // 地图事件传递
  const mapEvent = computed(() => store.getters.mapEvent);

  // 地图中心坐标
  const mapCenterPoint = [108.37586, 22.81221];

  // 地图视图参数配置
  const mapViewConfig = (container) => {
    return {
      container,
      alphaCompositingEnabled: true,
      // 星空环境
      environment: {
        background: {
          type: "color",
          color: [0, 0, 0],
        },
        starsEnabled: true,
        atmosphereEnabled: true,
      },
      constraints: {
        snapToZoom: false,
        // 禁止旋转
        rotationEnabled: false,
        viewingMode: "local",
      },
      spatialReference: {
        wkid: SPATIAL_REFERENCE_WKID,
      },
    };
  };

  return {
    store,
    mapEvent,
    mapCenterPoint,
    mapViewConfig,
  };
}
