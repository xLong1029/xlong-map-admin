import router from "./router";
import store from "./store";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
import { getPageTitle } from "@/utils";

const whiteList = ["/login", "/404"]; // 重定向白名单

router.beforeEach(async(to, from, next) => {
    // 页面标题
    document.title = getPageTitle(to.meta.title);

    const hasRoles = store.getters.roles && store.getters.roles.length > 0;

    if (hasRoles) {
        next();
    }
    // 刷新页面或者首次打开系统
    else {
        try {
            const hasToken = getToken();

            if (hasToken) {
                if (to.path === "/login") {
                    store.dispatch("app/setSysLoading", false);
                    next("/map");
                } else {
                    // 获取用户信息
                    const { roles } = await store.dispatch("user/getInfo");

                    console.log(`Get role's value, and the user's roles is ${roles}.`);

                    // 获取可通过的路由
                    await store.dispatch("permission/generateRoutes", roles);

                    // 取消系统加载
                    store.dispatch("app/setSysLoading", false);

                    // hack方法以确保addroutes是完整的
                    // 设置replace:true，这样导航就不会留下历史记录
                    next({...to, replace: true });
                }
            } else {
                store.dispatch("app/setSysLoading", false);
                if (whiteList.indexOf(to.path) >= 0) {
                    next();
                } else {
                    next("/login");
                }
            }
        } catch (err) {
            console.log(err);
            // 重登录
            ElMessage.error(err || "用户信息已失效，请重新登录");

            setTimeout(async() => {
                await store.dispatch("user/logout");
                next("/login");
            }, 500);
        }
    }
});