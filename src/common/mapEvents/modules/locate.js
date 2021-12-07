/*
 * 定位事件
 */
import { ElMessage } from "element-plus";
import Point from "@arcgis/core/geometry/Point";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import PopupTemplate from "@arcgis/core/PopupTemplate";
// 配置
import { SPATIAL_REFERENCE_WKID } from "config/index.js";

export default {
  /**
   * 定位并标记坐标
   * @param {*} view 视图
   * @param {*} data 坐标数据
   */
  onLocateToCoordAndMark: (view, data) => {
    const { lon, lat } = data;

    if (!lon || !lat) {
      ElMessage.warning("请输入完整的非0坐标数值");
      return;
    }

    const target = [parseFloat(lon), parseFloat(lat)];

    view
      .goTo(
        {
          target,
          heading: 0,
          tilt: 0,
        },
        {
          duration: 500,
        }
      )
      .then(function () {
        console.log(`已成功定位至${target}`);
      });
  },
  /**
   * 显示坐标点标记物
   * @param {*} view 视图
   * @param {*} data 坐标数据
   */
  onShowCoordMaker: (view, data) => {
    const { lon, lat, title, symbol } = data;

    if (!lon || !lat) {
      ElMessage.warning("坐标有误！无法定位并显示标记物");
      return;
    }

    let newPoint = new Point(lon, lat, new SpatialReference({ wkid: SPATIAL_REFERENCE_WKID }));
    let picGraphic = new Graphic(newPoint, symbol);

    let popupTemplate = new PopupTemplate(
      {
        title:title || "标记坐标",
        content: `<div>经度：${lon}，纬度：${lat}</div>`
      }
    );
    picGraphic.popupTemplate = popupTemplate;

    let layer = view.map.layers.items.find(x => x.id == 'graphicsLayer');
    if(layer){
      // 显示图标
      layer.graphics.add(picGraphic);
    }
  },
  /**
   * 获取拾取坐标
   * @param {*} view 视图
   * @param {*} data 坐标数据
   */
  onGetLocateCoord: (view, data) => {
    const draw = new Draw({
      view,
    });

    const { store } = data;

    let createPoint = function (event) {
      // 获取所有顶点
      const coordinates = event.coordinates;
      console.log(coordinates);

      if(!coordinates){
        ElMessage.warning("坐标有误！请点击地图拾取新坐标");
        return;
      }

      store.dispatch("map/setLocateData", {
        lon: coordinates[0],
        lat: coordinates[1]
      });
    };

    var action = draw.create("point", {
      mode: "click",
    });

    view.focus();
    action.on("vertex-add", createPoint);
    action.on("vertex-remove", createPoint);
    action.on("draw-complete", createPoint);
  },
  /**
   * 清除所有坐标标记
   * @param {*} view 视图
   */
  onClearCoordMarker: (view) => {
    let layer = view.map.layers.items.find(x => x.id == 'graphicsLayer');

    console.log(layer);
    if (layer) {
      layer.graphics.removeAll();
    }
  },
  /**
   * 获取当前位置并定位
   * @param {*} view 视图
   */
  onLocate: (view) => {
    console.log("点击了定位按钮");
  },
  /**
   * 定位到指定坐标
   * @param {*} view 视图
   * @param {*} data
   */
  onLocateToCoord: (view, data) => {
    view.goTo(data);
  },
  /**
   * 定位到指定范围
   * @param {*} view 视图
   * @param {*} data
   */
  onLocateToExtent: (view, data) => {
    try {
      const { extent, params } = data;
      view.goTo(extent, params);
    } catch (e) {
      console.log(e);
    }
  },
};
