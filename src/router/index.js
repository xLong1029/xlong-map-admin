import LayoutDefault from "@/layout/default/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const VITE_APP_ENV =
    import.meta.env.VITE_APP_ENV;

/**
 * 静态路由
 */
export const constantRoutes = [{
    path: "/404",
    name: "Err404",
    hidden: true,
    component: () =>
        import ("@/views/error-page/404.vue"),
}, {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () =>
        import ("@/views/login/index.vue"),
}, {
    path: "/",
    component: LayoutDefault,
    redirect: "/map",
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
        history: createWebHistory(VITE_APP_ENV === 'test' ? '' : '/xlong-map-admin/'),
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