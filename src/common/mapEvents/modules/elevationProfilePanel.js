/**
 * 地图剖面高度分析工具相关事件
 */

import ElevationProfile from "@arcgis/core/widgets/ElevationProfile";
import { removeWidget } from "utils/map";
let widget = null;

export default {
  /**
   * 打开剖面高度分析
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenElevationProfile: (view, data) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const { panelID } = data;

    console.log("展开剖面高度分析面板");

    const panelContent = document.getElementById(panelID);

    const elevationProfileUtil = document.createElement("div");
    elevationProfileUtil.id = "elevationProfile";

    panelContent.appendChild(elevationProfileUtil);

    widget = new ElevationProfile({
      view,
      id: "ElevationProfile",
      profiles:[{
        type:"ground",
        title:"地形"
      },{
        type:"view",
        title:"场景"
      },{
        type:"input",
        title:"输入"
      }],
      container: document.getElementById(elevationProfileUtil.id),
    });
  },

  /**
   * 取消剖面高度分析
   * @param {*} view 视图
   */
  onRemoveElevationProfile: (view) => {
    console.log("收起剖面高度分析面板");
    removeWidget(view, widget);
  },
};
