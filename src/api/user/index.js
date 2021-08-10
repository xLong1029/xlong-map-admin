/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 用户信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-08-10
 */
import BmobServer from "bmob/bmob-server.js";
import Bmob from "hydrogen-js-sdk";

export default {
  /**
   * 登录
   *
   * @param {*} params 参数对象
   */
  Login: (params) => {
    return new Promise((resolve, reject) => {
      Bmob.User.login(params.username, params.password)
        .then((res) => resolve({ code: 200, data: res }))
        .catch((err) => reject(err));
    });
  },
  /**
   * 获取用户信息
   *
   * @param {*} token token
   */
  GetUser: (token) => {
    let query = BmobServer.GetQuery("_User");
    query.equalTo("token", "==", token);
    // 只返回select的字段值
    query.select(
      "username",
      "role",
      "userFace",
      "nickName",
      "realName",
      "gender",
      "companyId"
    );
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((res) => {
          resolve({ code: 200, data: res[0] });
        })
        .catch((err) => reject(err));
    });
  },
  /**
   * 修改个人资料
   *
   * @param {*} params 修改的参数对象
   * @param {*} id 对象id
   */
  EditProfile: (params, id) => {
    return new Promise((resolve, reject) => {
      BmobServer.EditOne("_User", id, params)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  /**
   * 修改密码
   *
   * @param {*} params 修改的参数对象
   * @param {*} token token
   */
  ChangePwd: (params, token) => {
    let query = BmobServer.GetQuery("_User");
    // 根据唯一键查询对象
    query.equalTo("token", "==", token);
    query.equalTo("password", "==", params.oldPassword);

    return new Promise((resolve, reject) => {
      query
        .find()
        .then((res) => {
          if (res.length) {
            // 只能批量修改
            res.set("password", params.newPassword);
            res
              .saveAll()
              .then(() => resolve({ code: 200, msg: "操作成功！" }))
              .catch((err) => reject(err));
          } else {
            resolve({ code: 404, msg: "旧密码不正确！" });
          }
        })
        .catch((err) => reject(err));
    });
  },
  /**
   * 退出登录，清理Bmob本地全部缓存
   *
   * @param {*} params 修改的参数对象
   * @param {*} token token
   */
  Logout: () => {
    Bmob.User.logout();
  },
};
