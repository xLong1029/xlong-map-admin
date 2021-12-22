/**
 * 地图剖面分析工具相关事件
 */

import Slice from "@arcgis/core/widgets/Slice";
import { removeWidget } from "utils/map";
let widget = null;

export default {
  /**
   * 打开剖面分析
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenSlice: (view, data) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const { panelID } = data;

    console.log("展开剖面分析面板");

    const panelContent = document.getElementById(panelID);

    const sliceUtil = document.createElement("div");
    sliceUtil.id = "slice";

    panelContent.appendChild(sliceUtil);

    widget = new Slice({
      view,
      id: "Slice",
      container: document.getElementById(sliceUtil.id),
    });
  },

  /**
   * 取消剖面分析
   * @param {*} view 视图
   */
  onRemoveSlice: (view) => {
    console.log("收起剖面分析面板");
    removeWidget(view, widget);
  },
};
