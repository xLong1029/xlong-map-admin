// import request from "utils/request";
// const VUE_APP_SERVER_API = process.env.VUE_APP_SERVER_API;

const user = {
  token: "debug",
  userId: "U01",
  avatar:
    "https://img2.baidu.com/it/u=3436121203,3749922833&fm=26&fmt=auto&gp=0.jpg",
  gender: "女",
  username: "admin",
  realname: "管理员",
  nickname: "Admin",
  companyId: "C01",
  roles: ["admin"],
};

export default {
  // 登录
  Login: (data) => {
    /* Demo-start */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password } = data;
        if (username === "admin" && password === "nnland") {
          resolve({
            code: 200,
            data: user,
            message: "请求成功",
          });
        } else {
          reject({
            code: 404,
            data: null,
            message: "用户名密码不正确",
          });
        }
      }, 500);
    });
    /* Demo-end */
  },
  // 获取用户信息
  GetUser: (token) => {
    /* Demo-start */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === "debug") {
          resolve({
            code: 200,
            data: user,
            message: "请求成功",
          });
        } else {
          reject({
            code: 404,
            data: null,
            message: "用户信息已失效",
          });
        }
      }, 500);
    });
    /* Demo-end */
    // return request({
    //   url: `${VUE_APP_SERVER_API}/GetUser`,
    //   method: "get",
    // });
  },
};
