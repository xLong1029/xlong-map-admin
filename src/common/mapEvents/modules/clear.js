/*
 * 地图清除图层相关事件
 */
export default {
  /**
   * 清除所有绘制图层
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onClearScreen: (view, data) => {
    console.log("点击了清屏按钮", data);

    if (data.store) {
      const { store } = data;
      // 清除截图和坐标拾取
      store.dispatch("map/setStartGetLocateCoord", false);
      store.dispatch("map/setStartScreenshot", false);
    }

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
