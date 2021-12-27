import LayoutDefault from "@/layout/default/index.vue";

const router = [
  {
    path: "/describe",
    component: LayoutDefault,
    redirect: "/describe/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/describe/index.vue"),
        name: "Describe",
        file: 'describe/index.vue',
        meta: { title: "系统说明", icon: "iconfont icon-shiyongwendang mr-5" },
      },
    ],
  },
];

export default router;
