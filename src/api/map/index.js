// import request from "utils/request";
// const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;

import mapservices from "mock/mapservices.json";

export default {
  // 获取地图服务目录树
  GetMapservices: () => {
    /* Demo-start */
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mapservices);
      }, 1000);
    });
    /* Demo-endt */
  },
};
