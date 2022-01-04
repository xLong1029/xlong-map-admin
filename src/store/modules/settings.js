import defaultSettings from "@/settings";
import { getLocalS, setLocalS } from "@/utils";

let settings = getLocalS("settings")
  ? JSON.parse(getLocalS("settings"))
  : { ...defaultSettings };

const {
  showSettings,
  fixedHeader,
  keepAlive,
  mapCameraAnimation,
  mapInfoPanel,
  mapUtilsPanel,
  mapOperatePanel,
  switchMap,
  mapScaleBar,
  mapBottomCoord,
} = settings;


const state = {
  // 直接读取getLocalS的值会监听不到变化导致主题色无法改变
  theme: defaultSettings.theme,
  showSettings,
  fixedHeader,  
  keepAlive,
  mapCameraAnimation,
  mapInfoPanel,
  mapUtilsPanel,
  mapOperatePanel,
  switchMap,
  mapScaleBar,
  mapBottomCoord,
};

const mutations = {
  RESET_SETTING: (state) => {
    let setting = { ...defaultSettings };
    for (let i in setting) {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(i)) {
        state[i] = setting[i];
      }
    }

    setLocalS("settings", JSON.stringify(state));
  },
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }

    setLocalS("settings", JSON.stringify(state));
  },
};

const actions = {
  resetSetting({ commit }) {
    commit("RESET_SETTING");
  },
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
