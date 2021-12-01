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
  // 定位数据
  locateData: {
    x: 0,
    y: 0,
    wkid: 4490
  },
};

const mutations = {
  CHANGE_MAP_EVENT: (state, mapEvent) => {
    state.mapEvent = mapEvent;
  },
  SET_LOCATE_DATA: (state, locateData) => {
    console.log(locateData);
    state.locateData = locateData
  },
};

const actions = {
  changeMapEvent({ commit }, mapEvent) {
    commit("CHANGE_MAP_EVENT", mapEvent);
  },
  setLocateData({ commit }, locateData) {
    console.log(124);
    commit("SET_LOCATE_DATA", locateData);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
