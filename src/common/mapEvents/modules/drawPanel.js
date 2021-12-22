/*
 * 地图绘制工具相关事件
 */
import Sketch from "@arcgis/core/widgets/Sketch";
import { removeWidget } from "utils/map";
let widget = null;

export default {
  /**
   * 绘制工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   * @param {*} mapViewType 当前视图类型是2D或3D
   */
  onOpenDraw: (view, data, mapViewType) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const { panelID } = data;

    console.log("展开绘制工具面板");

    const panelContent = document.getElementById(panelID);

    const drawUtil = document.createElement("div");
    drawUtil.id = `draw${mapViewType}`;

    panelContent.appendChild(drawUtil);

    widget = new Sketch({
      layer: view.map.findLayerById("graphicsLayer"),
      view,
      id: "Sketch",
      creationMode: "update",
      container: document.getElementById(drawUtil.id),
    });
  },

  /**
   * 取消绘制工具
   * @param {*} view 视图
   */
  onRemoveDraw: (view) => {
    console.log("收起绘制工具面板");
    removeWidget(view, widget);
  },
};
