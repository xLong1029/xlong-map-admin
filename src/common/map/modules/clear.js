/**
 * 地图清除图层相关事件
 */
export default {
  /**
   * 清除所有绘制图层
   * @param {*} view 视图
   */
   onClearScreen: (view) => {
    console.log("点击了清屏按钮");

    if(view.map.graphics && view.map.graphics.length){
      view.map.graphics.removeAll();
    }    
  },
};
