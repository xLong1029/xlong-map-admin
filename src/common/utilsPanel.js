/*
 * 模块 : 地图工具栏相关
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-07-30
 * 版本 : version 1.0
 */

export default function () {
  /**
   * 判断工具是否禁止
   * @param {*} enable2D 2D模式下是否可用
   * @param {*} enable3D 2D模式下是否可用
   * @param {*} mapViewType 当前地图视图为2D或3D
   * @returns ture/false
   */
  const isUtilDisabled = (enable2D, enable3D, mapViewType) => {
    if (
      (enable2D && mapViewType === "3D" && !enable3D) ||
      (enable3D && mapViewType === "2D" && !enable2D)
    ) {
      return true;
    }
    return false;
  };

  /**
   * 当前面板是否高亮
   * @param {*} hPanels 当前实例的高亮面板对象
   * @param {*} component 当前面板对应的组件
   * @returns ture/false
   */
  const isUtilActive = (hPanels, component) => {
    const index = hPanels.findIndex((e) => e.component === component);
    return index >= 0;
  };

  return {
    isUtilDisabled,
    isUtilActive
  };
}
