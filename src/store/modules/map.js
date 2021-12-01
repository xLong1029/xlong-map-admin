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
    lon: 0,
    lat: 0
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
    commit("SET_LOCATE_DATA", locateData);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
