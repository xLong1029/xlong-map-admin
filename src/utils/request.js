/* eslint-disable */
import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";

const production = process.env.NODE_ENV === "production";

export function handelRequestError(error) {
  switch (error.response.status) {
    case 401:
      setTimeout(() => {
        ElMessage({
          message: "未授权！请重新登录",
          type: "error",
          duration: 5 * 1000,
        });
        store.dispatch("user/logout");
        this.$router.push({ name: "Login" });
      }, 500);
      break;
    case 403:
      ElMessage({
        message: error.response.content,
        type: "error",
        duration: 5 * 1000,
      });
      break;
    case 500:
      ElMessage({
        message: "服务器繁忙，请稍后重试",
        type: "error",
        duration: 5 * 1000,
      });
      break;
    default:
      break;
  }
}

export function configSetting(config) {
  // 生产环境
  if (production) {
    if (config.url.indexOf("/suapi/Login") >= 0) {
      config.headers["Authorization"] = "bearer " + store.getters.token;
    }
  }
  // 开发环境
  else {
    config.headers["Authorization"] = "bearer " + store.getters.token;
  }

  return config;
}

const service = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 200000,
});

service.interceptors.request.use(
  (config) => {
    return configSetting(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response) {
      handelRequestError(error);
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
