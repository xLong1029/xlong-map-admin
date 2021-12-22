/*
 * 地图日照分析工具相关事件
 */
 import Daylight from "@arcgis/core/widgets/Daylight";
 import { removeWidget } from "utils/map";
 let widget = null;
 
 export default {
   /**
   * 展开i日照分析
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenDayLight: (view, data) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const { panelID } = data;

    console.log("展开日照分析面板");

    const panelContent = document.getElementById(panelID);

    const daylightUtil = document.createElement("div");
    daylightUtil.id = "daylight";

    panelContent.appendChild(daylightUtil);

    widget = new Daylight({
      view,
      id: "Daylight",
      dateOrSeason: "season",
      container: document.getElementById(daylightUtil.id),
    });
  },
 
   /**
    * 取消日照分析
    * @param {*} view 视图
    */
   onRemoveDayLight: (view) => {
     console.log("收起日照分析面板");
     removeWidget(view, widget);
   },
 };