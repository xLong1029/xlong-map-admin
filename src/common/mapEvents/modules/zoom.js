/*
 * 地图放大缩小相关事件
 */
import Zoom from "@arcgis/core/widgets/Zoom";

export default {
  /**
   * 放大
   * @param {*} view 视图
   */
  onZoomIn: (view) => {
    console.log("点击了放大按钮");

    let zoom = new Zoom({
      viewModel: {
        view: view,
      },
    });

    zoom.viewModel.zoomIn();
  },

  /**
   * 缩小
   * @param {*} view 视图
   */
  onZoomOut: (view) => {
    console.log("点击了缩小按钮");

    let zoom = new Zoom({
      viewModel: {
        view: view,
      },
    });

    zoom.viewModel.zoomOut();
  },
};
