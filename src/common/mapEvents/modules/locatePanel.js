/*
 * 地图定位事件
 */

import { ElMessage } from "element-plus";
import Point from "@arcgis/core/geometry/Point";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import locateImg from "@/assets/images/locate.png";
// 工具
import { setLocalS } from "utils";
// 配置
import { SPATIAL_REFERENCE_WKID } from "config/index.js";

let draw = null;

export default {
  /**
   * 打开定位工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenLocate: (view, data) => {
    console.log("展开定位工具面板");
  },

  /**
   * 取消定位工具
   * @param {*} view 视图
   *  @param {*} data 传递数据
   */
  onRemoveLocate: (view, data) => {
    console.log("收起定位工具面板");

    // 取消获取点和十字指针样式
    draw = null;
    const viewSurface = document.getElementsByClassName("esri-view-surface")[0];
    if(viewSurface){
      viewSurface.setAttribute("data-cursor", "default");
      viewSurface.setAttribute("data-interacting", "false");
    }   

    if (data.store) {
      const { store } = data;
      // 清除坐标拾取
      store.dispatch("map/setStartGetLocateCoord", false);
      store.dispatch("map/setLocateData", {
        lon: 0,
        lat: 0,
      });
    }
  },

  /**
   * 定位并标记坐标
   * @param {*} view 视图
   * @param {*} data 坐标数据
   */
  onLocateToCoordAndMark: (view, data) => {
    setLocalS("startGetLocateCoord", false);

    const { lon, lat } = data;

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
      ElMessage.error("坐标有误！无法定位并显示标记物");
      return;
    }

    let newPoint = new Point(lon, lat, new SpatialReference({ wkid: SPATIAL_REFERENCE_WKID }));
    let picGraphic = new Graphic(newPoint, symbol);

    let popupTemplate = new PopupTemplate(
      {
        title: title || "标记坐标",
        content: `<div>经度：${lon}，纬度：${lat}</div>`
      }
    );
    picGraphic.popupTemplate = popupTemplate;

    let layer = view.map.layers.items.find(x => x.id == 'graphicsLayer');
    if (layer) {
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
    draw = new Draw({
      view,
    });

    const { store } = data;

    let createPoint = function (event) {
      if (draw) {
        // 获取所有顶点
        const coordinates = event.coordinates;

        if (!coordinates) {
          ElMessage.error("坐标有误！请点击地图拾取新坐标");
          return false;
        }

        store.dispatch("map/setLocateData", {
          lon: coordinates[0],
          lat: coordinates[1]
        });

        store.dispatch("map/setStartGetLocateCoord", false);

        ElMessage.success("已成功获取坐标信息");
      }
    };

    const action = draw.create("point", {
      mode: "click",
    });

    view.focus();
    action.on("vertex-add", createPoint); // 鼠标单击
    action.on("vertex-remove", createPoint); // 撤销点
    action.on("draw-complete", createPoint); // 鼠标双击
  },

  /**
   * 清除所有坐标标记
   * @param {*} view 视图
   */
  onClearCoordMarker: (view) => {
    let layer = view.map.layers.items.find(x => x.id == 'graphicsLayer');
    if (layer) {
      layer.graphics.removeAll();
    }
  },

  /**
   * 获取当前位置，定位并显示标记物
   * @param {*} view 视图
   */
  onLocate: (view) => {
    console.log("点击了定位按钮");

    if (navigator.geolocation) {

      // 成功获取到定位的经纬度，利用arcgis api跳转到定位所在的位置
      let showSuccess = (position) => {
        console.log(position);

        const { longitude, latitude } = position.coords;
        console.log('纬度:' + latitude + ',经度:' + longitude);

        view
          .goTo(
            {
              target: [longitude, latitude],
              heading: 0,
              tilt: 0,
            },
            {
              duration: 500,
            }
          )
          .then(function () {
            let newPoint = new Point(longitude, latitude, new SpatialReference({ wkid: SPATIAL_REFERENCE_WKID }));

            const symbol = {
              type: "picture-marker",
              url: locateImg,
              width: "40px",
              height: "40px",
            };
            let picGraphic = new Graphic(newPoint, symbol);

            let popupTemplate = new PopupTemplate(
              {
                title: "当前位置",
                content: `<div>经度：${longitude}，纬度：${latitude}</div>`
              }
            );
            picGraphic.popupTemplate = popupTemplate;

            let layer = view.map.layers.items.find(x => x.id == 'graphicsLayer');
            if (layer) {
              // 显示图标
              layer.graphics.add(picGraphic);
            }

            ElMessage.success("已定位到当前位置");
          });
      }

      // 获取失败的回调函数
      let showError = ({ code, PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT, UNKNOWN_ERROR }) => {
        console.log(code, PERMISSION_DENIED);
        let msg = "定位失败";
        switch (code) {
          case PERMISSION_DENIED:
            msg += "，用户拒绝请求地理定位";
            break;
          case POSITION_UNAVAILABLE:
            msg += "，位置信息不可用";
            break;
          case TIMEOUT:
            msg += "，获取用户位置超时";
            break;
          case UNKNOWN_ERROR:
            msg += "，未知错误";
            break;
        }

        ElMessage.error(msg);
      }

      navigator.geolocation.getCurrentPosition(showSuccess, showError);
    } else {
      ElMessage.warning("抱歉！您的浏览器不支持地理定位");
      return;
    }
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
      view.goTo(extent, params).then(function () {
        if (params.showMessage) {
          ElMessage.success("已将视图调整至南宁市全幅区域")
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
};
