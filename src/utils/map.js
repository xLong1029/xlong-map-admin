import proj4 from "proj4";
import wkids from "mock/wkids.json";

/**
 * 移除地图部件
 *
 * @param {*} view 视图
 * @param {*} widget 部件
 */
export function removeWidget(view, widget) {
  if (widget) {
    if (view) {
      view.ui.remove(widget);
    }
    widget.destroy();
    widget = null;
  }
}

/**
 * 坐标转换
 *
 * @param {*} sourceWkid 源坐标系
 * @param {*} toWkid 目标坐标系
 * @param {*} x x坐标
 * @param {*} y y坐标
 *
 */
export function convertCoord(sourceWkid, toWkid, x, y) {
  try {
    if (!wkids[sourceWkid] && !wkids[toWkid]) {
      return null;
    }

    // proj4.defs(
    //   `EPSG:${toWkid}`,
    //   wkids[toWkid]
    // );

    return proj4(wkids[sourceWkid], wkids[toWkid], [
      parseFloat(x),
      parseFloat(y),
    ]);
  } catch (e) {
    console.log(e);
    return null;
  }
}
