import { asyncRoutes, constantRoutes, resetRouter } from "router";
import router from "router";

const modulesFiles = import.meta.globEager('./../../views/*/*.vue');

/**
 * 使用meta.role判断当前用户是否具有权限访问
 * @param route
 * @param roles
 */
function hasPermission(route, roles) {
  if (!roles) return false;

  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 递归过滤动态路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }

      // 修复警告：The above dynamic import cannot be analyzed by vite
      if (route.file) {        
        tmp.component = modulesFiles[`./../../views/${route.file}`].default;
      }

      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  // 生成路由
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      resetRouter();

      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);

      // 404重定向配置放结尾
      accessedRoutes.push({
        path: "/:catchAll(.*)",
        redirect: "/404",
        hidden: true,
      });

      // 动态添加路由，从前面插入
      accessedRoutes.forEach((e) => {
        router.addRoute(e);
      });

      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
