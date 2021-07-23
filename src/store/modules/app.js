import settings from '@/settings';
const { sysTitle, companyName } = settings;

const currentEnv = import.meta.env.VITE_APP_ENV;

const state = {
  // 路由页面加载loading
  pageLoading: false,
  // 系统初始化loading
  sysLoading: true,
  // 系统标题
  sysTitle, 
  // 当前环境
  currentEnv,
  // 版权公司名称
  companyName
};

const mutations = {
  SET_PAGE_LOADING: (state, pageLoading) => {
    state.pageLoading = pageLoading;
  },
  SET_SYS_LOADING: (state, sysLoading) => {
    state.sysLoading = sysLoading;
  }
};

const actions = {
  setPageLoading({ commit }, pageLoading) {
    commit("SET_PAGE_LOADING", pageLoading);
  },
  setSysLoading({ commit }, sysLoading) {
    commit("SET_SYS_LOADING", sysLoading);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
