/**
 * 图层操作相关事件
 */
export default {
  /**
   * 添加图层
   * @param {*} view 视图
   * @param {*} data 数据
   */
  onAddLayer: (view, data) => {
    console.log("已勾选资源目录树形节点，数据为");
    console.log(data);
  },

  /**
   * 移除图层
   * @param {*} view 视图
   * @param {*} data 数据
   */
  onRemoveLayer: (view, data) => {
    console.log("当前节点取消勾选，数据为");
    console.log(data);
  },
};
