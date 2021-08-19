/**
 * 地图底图切换
 */

// 配置
import {
  MAP_IMAGE_BASEMAP_LAYER,
  MAP_VECTOR_BASEMAP_GROUP_LAYER,
  MAP_TERRAIN_BASEMAP_GROUP_LAYER,
} from "config/index.js";
import { ElMessage } from "element-plus";

export default {
  /**
   * 切换底图
   *
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onSwitchBasemap: (view, data) => {
    const { basemap } = data;
    console.log(`点击切换底图：${basemap}`);

    const layerList = [
      MAP_IMAGE_BASEMAP_LAYER,
      MAP_VECTOR_BASEMAP_GROUP_LAYER,
      MAP_TERRAIN_BASEMAP_GROUP_LAYER,
    ];

    layerList.forEach((e) => {
      const layer = view.map.findLayerById(e);

      if (layer) {
        layer.visible = false;
      }
    });

    switch (basemap) {
      case "hybrid":
        view.map.findLayerById(MAP_IMAGE_BASEMAP_LAYER).visible = true;
        break;
      case "vector":
        view.map.findLayerById(MAP_VECTOR_BASEMAP_GROUP_LAYER).visible = true;
        break;
      case "terrain":
        view.map.findLayerById(MAP_TERRAIN_BASEMAP_GROUP_LAYER).visible = true;
        ElMessage.success("已将地图比例调整至最佳比例 1:30000");
        break;
      default:
        console.log("basemap is error");
    }
  },
};
