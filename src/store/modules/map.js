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
  // 是否开启拾取坐标
  startGetLocateCoord: false,
  // 定位数据
  locateData: {
    lon: 0,
    lat: 0
  },
  // 是否开启截图
  startScreenshot: false,
};

const mutations = {
  CHANGE_MAP_EVENT: (state, mapEvent) => {
    state.mapEvent = mapEvent;
  },
  SET_START_GET_LOCATE_COORD: (state, startGetLocateCoord) => {
   
    state.startGetLocateCoord = startGetLocateCoord
  },
  SET_LOCATE_DATA: (state, locateData) => {
    console.log(locateData);
    state.locateData = locateData
  },
  SET_START_SCREENSHOT: (state, startScreenshot) => {
    console.log(111, startScreenshot);
    state.startScreenshot = startScreenshot
  },
};

const actions = {
  changeMapEvent({ commit }, mapEvent) {
    commit("CHANGE_MAP_EVENT", mapEvent);
  },
  setStartGetLocateCoord({ commit }, startGetLocateCoord) {
    commit("SET_START_GET_LOCATE_COORD", startGetLocateCoord);
  },
  setLocateData({ commit }, locateData) {
    commit("SET_LOCATE_DATA", locateData);
  },
  setStartScreenshot({ commit }, startScreenshot) {
    commit("SET_START_SCREENSHOT", startScreenshot);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
