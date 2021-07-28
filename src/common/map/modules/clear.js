/*
 * 地图清除图层相关事件
 */
export default {
  /**
   * 清除所有绘制图层
   * @param {*} view 视图
   */
  onClearScreen: (view) => {
    console.log("点击了清屏按钮");

    view.graphics.removeAll();

    if (view.map.layers && view.map.layers.length) {
      const layers = view.map.layers.items;
      layers.forEach(function (layer) {
        if (layer.type === "graphics") {
          layer.graphics.removeAll();
        }
      });
    }
  },
};
