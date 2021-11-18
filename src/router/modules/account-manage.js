import LayoutDefault from "@/layout/default/index.vue";

const router = [
  {
    path: "/account-manage",
    component: LayoutDefault,
    redirect: "/account-manage/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/account-manage/index.vue"),
        name: "AccountManage",
        meta: { title: "账户管理", icon: "iconfont icon-zhanghuguanli mr-5", roles: ["admin"] },
      },
    ],
  }
];

export default router;
