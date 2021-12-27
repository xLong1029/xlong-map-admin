import LayoutDefault from "@/layout/default/index.vue";

const router = [{
    path: "/account-manage",
    component: LayoutDefault,
    redirect: "/account-manage/index",
    meta: {
        roles: ["admin", "manage"]
    },
    children: [{
        path: "index",
        component: () =>
            import ("@/views/account-manage/index.vue"),
        name: "AccountManage",
        file: 'account-manage/index.vue',
        meta: { title: "用户管理", icon: "iconfont icon-zhanghuguanli mr-5" },
    }, ],
}];

export default router;