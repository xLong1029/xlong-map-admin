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
    if (!data["wkid"] || !wkids[data.wkid]) {
      ElMessage.warning("无法识别当前的坐标系，请重新选择");
      return;
    }

    if (data.x == 0 || data.y == 0) {
      ElMessage.warning("请输入完整的坐标数值");
      return;
    }

    let coord = new Array();
    if (data.wkid != 4490) {
      coord = convertCoord(
        data.wkid,
        4490,
        parseFloat(data.x),
        parseFloat(data.y)
      );
    } else {
      coord[0] = data.x;
      coord[1] = data.y;
    }

    const target = [parseFloat(coord[0]), parseFloat(coord[1])];

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
      view: view,
    });

    const { store, spatialReference } = data;

    console.log(store);
    const { wkid } = spatialReference;

    let createPoint = function (event) {
      // 获取所有顶点
      const coordinates = event.coordinates;
      if (!wkids[wkid]) {
        ElMessage.warning("无法识别当前的坐标系，请重新选择");
        return;
      }

      if (wkid != 4490) {
        let point = new Point(
          parseFloat(coordinates[0]),
          parseFloat(coordinates[1]),
          new SpatialReference(4490)
        );

        if (!projection.isSupported()) {
          console.log("projection is not supported");
          return;
        }

        projection.load().then(function () {
          let res = projection.project(
            point,
            new SpatialReference({
              wkid,
            })
          );

          const locateData ={
            x: res.x,
            y: res.y,
            wkid,
          }

          store.dispatch("map/setLocateData", locateData);
        });
      } else {

        const locateData ={
          x: coordinates[0],
          y: coordinates[1],
          wkid,
        }

        store.dispatch("map/setLocateData", locateData);
      }
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
