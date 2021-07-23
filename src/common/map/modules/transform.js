/**
 * 地图2/3D转换相关事件
 */
export default {
  /**
   * 2/3D切换
   * @param {*} view 视图
   * @param {*} data 当传递数据
   * @param {*} mapViewType 当前视图类型是2D或3D
   */
  onTransform: (view, data, mapViewType) => {
    console.log(`点击了2/3D切换按钮，当前视图是${mapViewType.value}视图`);
  },
};
