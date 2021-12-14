/*
 * 地图定位事件
 */

export default {
  /**
   * 打开定位工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenLocate: (view, data) => {
    console.log("展开定位工具面板");
  },

  /**
   * 取消定位工具
   * @param {*} view 视图
   *  @param {*} data 传递数据
   */
  onRemoveLocate: (view, data) => {
    console.log("收起定位工具面板");

    console.log(view);

    if (data.store) {
      const { store } = data;
      // 清除坐标拾取
      store.dispatch("map/setStartGetLocateCoord", false);
      store.dispatch("map/setLocateData", {
        lon: 0,
        lat: 0,
      });
    }
  },
};
