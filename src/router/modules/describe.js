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
        meta: { title: "系统说明", icon: "el-icon-s-home" },
      },
    ],
  },
];

export default router;
