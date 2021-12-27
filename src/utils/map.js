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