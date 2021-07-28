/*
 * 地图旋转事件
 */
export default {
  /**
   * 地图旋转
   *
   * @param {*} view 视图
   * @param {*} data 传递数据
   */
  onRotate: (view, data) => {
    // console.log(view.camera.heading, data);

    const { angle } = data;

    if (!angle && angle !== 0) {
      console.log("缺少旋转角度");
      return false;
    }

    view
      .goTo({
        heading: -angle,
      })
      .catch((error) => {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
  },
};
