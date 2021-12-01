/*
 * 地图定位事件
 */

import { ElMessage } from "element-plus";
import wkids from "mock/wkids.json";
import { convertCoord } from "utils/map";
import Draw from "@arcgis/core/views/draw/Draw";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as projection from "@arcgis/core/geometry/projection";

export default {
  /**
   * 打开定位工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenLocate: (view, data) => {
    console.log("展开定位工具面板");
    //console.log(view, data);
  },

  /**
   * 取消定位工具
   * @param {*} view 视图
   */
  onRemoveLocate: (view) => {
    console.log("收起定位工具面板");
    //console.log(view);
  },
  
  /**
   * 定位并标记坐标
   * @param {*} view 视图
   * @param {*} data 坐标数据
   */
  onLocateToCoordAndMarket: (view, data) => {
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
   * 获取鼠标坐标
   * @param {*} view 视图
   * @param {*} data
   */
  onGetLocateCoord: (view, data) => {
    const draw = new Draw({
      view,
    });

    const { store } = data;

    let createPoint = function (event) {
      // 获取所有顶点
      const coordinates = event.coordinates;

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
};
