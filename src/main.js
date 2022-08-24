import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 初始化指令
import initDirectives from "./directives";

// 路由权限
import "./permission.js";

// 基于断点的隐藏类样式
import 'element-plus/theme-chalk/display.css';
// element-plus的message相关样式
import "element-plus/theme-chalk/src/message.scss"
import "element-plus/theme-chalk/src/message-box.scss"
// 字体样式
import "./assets/iconfont/iconfont.css";
// 全局样式
import "./styles/index.scss";

const app = createApp(App);
app.config.productionTip = false;
initDirectives(app);

app
    .use(store)
    .use(router)
    .mount("#app");