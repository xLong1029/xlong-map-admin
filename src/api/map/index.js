/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 地图操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-12-27
 */
import request from "utils/request.js";

export default {
    /**
     * 获取工具列表
     */
     GetUtilList: () => {
        return request({
            url: '/api/map/util-list',
            method: 'get'
        })
    }
};