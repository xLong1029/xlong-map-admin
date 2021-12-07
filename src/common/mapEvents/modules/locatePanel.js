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
   */
  onRemoveLocate: (view) => {
    console.log("收起定位工具面板");
  }
};
