/**
 * 地图量算工具相关事件
 */

 import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
 import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
 import DirectLineMeasurement3D from "@arcgis/core/widgets/DirectLineMeasurement3D";
 import AreaMeasurement3D from "@arcgis/core/widgets/AreaMeasurement3D";
 import { removeWidget } from "utils/map";
 
 let widget = null;
 
 export default {
   /**
    * 展开量算工具
    * @param {*} view 视图
    */
   onOpenMeasure: (view) => {
     console.log("展开量算工具面板");
   },
 
   /**
    * 取消绘制工具
    * @param {*} view 视图
    */
   onRemoveMeasure: (view) => {
     console.log("收起量算工具面板");
     removeWidget(view, widget);
   },
 
   /**
    * 2D量算距离
    * 
    * @param {*} view 视图
    * @param {*} data 传递数据
    */
    onMeasureDistance2D: (view, data) => {
     removeWidget(view, widget);
 
     if (!data || !data.panelID) {
       console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
       return false;
     }
 
     const { panelID, activeButton } = data;
     
 
     if (activeButton === "distance") {
       console.log("激活2D量算工具栏里的距离计算按钮");
 
       const panelContent = document.getElementById(panelID);
 
       const measureUtil = document.createElement("div");
       measureUtil.id = "measureDistance2D";
 
       panelContent.appendChild(measureUtil);
 
       widget = new DistanceMeasurement2D({
         view,
         id: "DistanceMeasurement2D",
         container: document.getElementById(measureUtil.id),
       });
     } else {
       console.log("取消3D量算工具栏里的距离计算按钮");
     }
   },
 
   /**
    * 2D量算面积
    * @param {*} view 视图
    * @param {*} data 传递数据
    */
   onMeasureArea2D: (view, data) => {
     removeWidget(view, widget);
 
     if (!data || !data.panelID) {
       console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
       return false;
     }
 
     const { panelID, activeButton } = data;
 
     if (activeButton === "area") {
       console.log("激活2D量算工具栏里的面积计算按钮");
 
       const panelContent = document.getElementById(panelID);
 
       const measureUtil = document.createElement("div");
       measureUtil.id = "measureArea2D";
 
       panelContent.appendChild(measureUtil);
 
       widget = new AreaMeasurement2D({
         view,
         id: "AreaMeasurement2D",
         container: document.getElementById(measureUtil.id),
       });
     } else {
       console.log("取消3D量算工具栏里的面积计算按钮");
     }
   },
 
   /**
    * 3D量算距离
    * @param {*} view 视图
    * @param {*} data 传递数据
    */
   onMeasureDistance3D: (view, data) => {
     removeWidget(view, widget);
 
     if (!data || !data.panelID) {
       console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
       return false;
     }
 
     const { panelID, activeButton } = data;
     
 
     if (activeButton === "distance") {
       console.log("激活3D量算工具栏里的距离计算按钮");
 
       const panelContent = document.getElementById(panelID);
 
       const measureUtil = document.createElement("div");
       measureUtil.id = "measureDistance3D";
 
       panelContent.appendChild(measureUtil);
 
       widget = new DirectLineMeasurement3D({
         view,
         id: "DirectLineMeasurement3D",
         container: document.getElementById(measureUtil.id),
       });
     } else {
       console.log("取消3D量算工具栏里的距离计算按钮");
     }
   },
 
   /**
    * 3D量算面积
    * @param {*} view 视图
    * @param {*} data 传递数据
    */
   onMeasureArea3D: (view, data) => {
     removeWidget(view, widget);
 
     if (!data || !data.panelID) {
       console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
       return false;
     }
 
     const { panelID, activeButton } = data;
 
     if (activeButton === "area") {
       console.log("激活3D量算工具栏里的面积计算按钮");
 
       const panelContent = document.getElementById(panelID);
 
       const measureUtil = document.createElement("div");
       measureUtil.id = "measureArea3D";
 
       panelContent.appendChild(measureUtil);
 
       widget = new AreaMeasurement3D({
         view,
         id: "AreaMeasurement3D",
         container: document.getElementById(measureUtil.id),
       });
     } else {
       console.log("取消3D量算工具栏里的面积计算按钮");
     }
   },
 };
 