import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 路由权限
import "./permission.js";
// 初始化ElementPlus
import initElementPlus from "./element-plus";
// 初始化ElementPlus
import initDirectives from "./directives";
// esri样式
// import "../public/static/esri/assets/themes/light/main.scss";
// 字体样式
import "@/assets/iconfont/iconfont.css";
// 全局样式
import "./styles/index.scss";

const app = createApp(App);
app.config.productionTip = false;

initElementPlus(app);
initDirectives(app);

app
  .use(store)
  .use(router)
  .mount("#app");
