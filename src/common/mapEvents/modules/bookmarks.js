/*
 * 书签相关事件
 */
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import {
  removeWidget
} from "utils/map";

let widget = null;

export default {
  /**
   * 打开书签工具
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onOpenBookmarks: (view, data) => {
    removeWidget(view, widget);

    if (!data || !data.panelID) {
      console.log("缺少传递数据 { panelID }，获取父级内容容器ID");
      return false;
    }

    const {
      panelID
    } = data;

    console.log("展开日照分析面板");

    const panelContent = document.getElementById(panelID);

    const bookmarks = document.createElement("div");
    bookmarks.id = "bookmarks";

    panelContent.appendChild(bookmarks);

    try {

      widget = new Bookmarks({
        view,
        id: "Bookmarks",
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true,
        visibleElements: {
          time: false // don't show the time (h:m:s) next to the date
        },
        container: document.getElementById(bookmarks.id),
      });

      view.ui.add(widget);

      panelContent.appendChild(bookmarks);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * 隐藏书签工具
   * @param {*} view 视图
   */
  onRemoveBookmarks: (view) => {
    console.log("隐藏书签工具");
    removeWidget(view, widget);
  },
};