/*
 * 功能 : 封装数据交互api接口(数据使用的是mock数据)。
 * 用处 : 用户信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-12-26
 */
import request from "utils/request.js";

export default {
    /**
     * 登录
     *
     * @param {*} data 参数对象
     */
    Login: (data) => {
        return request({
            url: '/api/user/login',
            method: 'post',
            data
        })
    },
    /**
     * 获取用户信息
     *
     * @param {*} token token
     */
    GetUser: (token) => {

        console.log(token);
        return request({
            url: `/api/user/info?token=${token}`,
            method: 'get'
        })
    },
    /**
     * 修改个人资料
     *
     * @param {*} params 修改的参数对象
     * @param {*} id 对象id
     */
    EditProfile: (params, id) => {

    },
    /**
     * 修改密码
     *
     * @param {*} params 修改的参数对象
     * @param {*} token token
     */
    ChangePwd: (params, token) => {

    },
    /**
     * 退出登录
     *
     * @param {*} params 修改的参数对象
     * @param {*} token token
     */
    Logout: () => {
        return request({
            url: '/api/user/logout',
            method: 'post',
            data
        })
    },
};