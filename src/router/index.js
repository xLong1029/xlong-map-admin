import LayoutDefault from "@/layout/default/index.vue";
import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 静态路由
 */
export const constantRoutes = [{
    path: "/404",
    name: "Err404",
    hidden: true,
    file: 'error-page/404.vue',
    component: () =>
        import ("@/views/error-page/404.vue"),
}, {
    path: "/login",
    name: "Login",
    hidden: true,
    file: 'login/index.vue',
    component: () =>
        import ("@/views/login/index.vue"),
}, {
    path: "/",
    component: LayoutDefault,
    redirect: "/map",
    file: 'map/index.vue',
    children: [{
        path: "map",
        name: "Map",
        component: () =>
            import ("@/views/map/index.vue"),
        meta: { title: "GIS地图", icon: "iconfont icon-map-b-o mr-5" },
    }],
}];

/**
 * 动态路由
 */
export const asyncRoutes = [];
const routesModules =
    import.meta.globEager("./modules/*.js");
Object.keys(routesModules).forEach((modulePath) => {
    asyncRoutes.push(...routesModules[modulePath].default);
});

/**
 * 初始化路由
 */
export const initRouter = () =>
    createRouter({
        history: createWebHashHistory(),
        scrollBehavior: () => ({ y: 0 }),
        routes: [...constantRoutes],
    });

let router = initRouter();

/**
 * 重置路由
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
    router = initRouter();
}

export default router;