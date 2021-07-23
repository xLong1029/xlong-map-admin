import Api from "api/user/index.js";
import { resetRouter } from "router";
import { getToken, removeToken, setToken } from "utils/auth";

const defaultUser = {
  userId: 0,
  avatar: "",
  gender: "",
  username: "",
  realname: "",
  nickname: "",
  companyId: "",
  roles: [],
};

// 清空账户信息
function clearAccount(_commit) {
  removeToken();
  resetRouter();
  _commit("SET_TOKEN", null);
  _commit("SET_USER", { ...defaultUser });
}

const state = {
  token: getToken(),
  user: { ...defaultUser },
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      Api.GetUser(token)
        .then((res) => {
          const { code, data } = res;
          if (code == 200) {            
            commit("SET_USER", data);
            resolve(data);
          } else {
            clearAccount(commit);
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          clearAccount(commit);
          reject(err);
        });
    });
  },

  // 登出
  logout({ commit }) {
    return new Promise((resolve) => {
      clearAccount(commit);
      resolve();
    });
  },

  // 登录
  login({ commit }, from) {
    return new Promise((resolve, reject) => {
      Api.Login(from)
        .then((res) => {
          const { code, data } = res;
          if (code == 200) {
            // 存储token
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            resolve(data);
          } else reject(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
