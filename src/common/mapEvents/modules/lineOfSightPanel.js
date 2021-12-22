/**
 * 地图视线分析工具相关事件
 */

import LineOfSight from "@arcgis/core/widgets/LineOfSight";
import { removeWidget } from "utils/map";
let widget = null;

export default {
  /**
   * 打开视线分析
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenLineOfSight: (view, data) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const { panelID } = data;

    console.log("展开视线分析面板");

    const panelContent = document.getElementById(panelID);

    const lineOfSightUtil = document.createElement("div");
    lineOfSightUtil.id = "lineOfSight";

    panelContent.appendChild(lineOfSightUtil);

    widget = new LineOfSight({
      view,
      id: "LineOfSight",
      container: document.getElementById(lineOfSightUtil.id),
    });
  },

  /**
   * 取消视线分析
   * @param {*} view 视图
   */
  onRemoveLineOfSight: (view) => {
    console.log("收起视线分析面板");
    removeWidget(view, widget);
  },
};
