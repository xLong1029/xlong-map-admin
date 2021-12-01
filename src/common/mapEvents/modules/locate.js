/*
 * 定位事件
 */
import Zoom from "@arcgis/core/widgets/Zoom";

export default {
  /**
   * 获取当前位置并定位
   * @param {*} view 视图
   */
   onLocate: (view) => {
    console.log("点击了定位按钮");
  },
};
