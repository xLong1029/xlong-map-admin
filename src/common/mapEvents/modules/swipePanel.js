/**
 * 地图卷帘工具相关事件
 */
import Swipe from "@arcgis/core/widgets/Swipe";
import { removeWidget } from "utils/map";
let widget = null;

export default {
  /**
   * 启用卷帘工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenSwipe: (view, data) => {
    console.log("启用卷帘工具");

    try {
      const { direction, leadingLayers, trailingLayers } = data;

      widget = new Swipe({
        id: "Swipe",
        view,
        position: 50,
        direction, //data.direction,
        leadingLayers,
        trailingLayers,
      });
      
      view.ui.add(widget);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * 取消卷帘工具
   * @param {*} view 视图
   */
  onRemoveSwipe: (view) => {
    console.log("取消卷帘工具");
    removeWidget(view, widget);
  },

  /**
   * 修改卷帘方向
   * @param {*} data 方向
   */
  onChangeSwipeDirection: (view, data) => {
    console.log("修改卷帘方向");
    view.ui.find("Swipe").direction = data.direction;
  },

  /**
   * 修改卷帘图层
   * @param {*} view 视图
   * @param {*} data 图层
   */
  onChangeSwipeLayer: (view, data) => {
    console.log("修改卷帘图层");
    if (widget) {

      const { leadingLayers, trailingLayers } = data;

      widget.leadingLayers.removeAll();
      widget.leadingLayers.addMany(leadingLayers);

      widget.trailingLayers.removeAll();
      widget.trailingLayers.addMany(trailingLayers);
    }
  },
};
