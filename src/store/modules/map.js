const state = {
  // 地图操作事件
  mapEvent: [
    // {
    //   // 事件名
    //   event: "",
    //   // 传递数据
    //   data: null,
    // },
  ],
};

const mutations = {
  CHANGE_MAP_EVENT: (state, mapEvent) => {
    state.mapEvent = mapEvent;
  }
};

const actions = {
  changeMapEvent({ commit }, mapEvent) {
    commit("CHANGE_MAP_EVENT", mapEvent);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
