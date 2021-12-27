import Api from "api/user/index.js";
import { resetRouter } from "router";
import { strToArr, delLocalS } from "utils";
import { getToken, removeToken, setToken } from "utils/auth";

const defaultUser = {
    userId: 0,
    avatar: "",
    gender: "",
    username: "",
    realName: "",
    nickName: "",
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
            Api.GetUser()
                .then((res) => {
                    const { code, data } = res;

                    // 登录成功
                    if (code == 200 && data) {
                        data.roles = strToArr(data.roles, ",");

                        commit("SET_USER", data);
                        resolve(data);
                    }
                    // 登录失败
                    else {
                        clearAccount(commit);
                        reject(res);
                    }
                })
                .catch((err) => {
                    clearAccount(commit);
                    reject(err);
                });
        });
    },

    // 登出
    logout({ commit }) {
        return new Promise((resolve) => {
            // Api.Logout();
            clearAccount(commit);
            resolve();
        });
    },

    // 登录
    login({ commit }, form) {
        return new Promise((resolve, reject) => {
            Api.Login(form)
                .then((res) => {
                    const { code, data } = res;

                    if (code == 200) {
                        // 存储token
                        setToken(data.token);
                        commit("SET_TOKEN", data.token);
                        data.roles = strToArr(data.roles, ",");
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