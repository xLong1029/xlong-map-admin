/*
 * 功能 : 封装bmob的增删改查数据方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-08-09
 * 版本 : version 2.4
 */
import { APPLICATION_ID, REST_API_KEY, SERCRET_KEY, SECURITY_CODE } from '@/config/index.js';
import { objOmit } from 'utils';
import Bmob from "hydrogen-js-sdk";

export default {
    // 初始化
    Init: () => {
        // Bmob.initialize(APPLICATION_ID, REST_API_KEY); // 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
        Bmob.initialize(SERCRET_KEY, SECURITY_CODE); // 初始化 SDK版本 2.0.0 以及之后版本
    },
    // 获取查询数据对象
    GetQuery: (tableName) => {
        // 创建查询对象，入口参数是对象类的实例
        return Bmob.Query(tableName)
    },
    // 获取列表数据
    GetListData: (query, pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            if (pageNo && pageSize) {
                // 统计满足query的结果集记录条数
                query.count().then(res => {
                    // console.log(`共有${res}条记录`)
                    let page = {
                        page: pageNo,
                        size: pageSize,
                        count: res
                    }

                    // 对createdAt字段降序排列
                    query.order("-createdAt")
                    // 返回数据条数，默认返回10条数据
                    query.limit(pageSize)
                    // 跳过前面几条数据开始
                    query.skip((pageNo - 1) * pageSize)

                    query.find().then(res => resolve({ code: 200, data: res, page })).catch(err => reject(err))
                })
            }
            else {
                query.find().then(res => resolve({ code: 200, data: res })).catch(err => reject(err))
            }
        })
    },
    // 查找所有数据
    FindAllData: (query) => {
        return new Promise((resolve, reject) => {
            query
                .find()
                .then(res => resolve({ code: 200, data: res }))
                .catch(err => reject(err))
        })
    },
    // 查找一行数据
    FindOneData: (query) => {
        return new Promise((resolve, reject) => {
            query.find().then(res => resolve({ code: 200, data: res[0] })).catch(err => reject(err))
        })
    },
    // 获取一行数据
    GetOne: (tableName, objectId) => {
        let query = Bmob.Query(tableName)
        return new Promise((resolve, reject) => {
            query.get(objectId).then(res => resolve({ code: 200, data: res })).catch(err => reject(err))
        })
    },
    // 添加一行数据
    AddOne: (tableName, params) => {
        let query = Bmob.Query(tableName)
        // 删除参数中的objectId值
        params = objOmit(params, ['objectId', 'createdAt', 'updatedAt'])
        return new Promise((resolve, reject) => {
            // 循环执行set操作
            for (let i in params) {
                // 对参数进行空处理
                params[i] = params[i] == null ? '' : params[i]
                query.set(i, params[i])
            }
            query.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
        })
    },
    // 删除一行数据
    DelOne: (tableName, objectId) => {
        let query = Bmob.Query(tableName)
        // 获取对象并删除
        return new Promise((resolve, reject) => {
            query.get(objectId).then(res => {
                res.destroy().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => console.log('无法通过该objectId获取数据'))
        })
    },
    // 修改一行数据
    EditOne: (tableName, objectId, params) => {
        let query = Bmob.Query(tableName)
        // 删除参数中的objectId值
        params = objOmit(params, ['objectId', 'createdAt', 'updatedAt'])
        // 获取对象并修改
        return new Promise((resolve, reject) => {
            query.get(objectId).then(res => {
                // 循环执行set操作
                for (let i in params) {
                    // 对参数进行空处理
                    params[i] = params[i] == null ? '' : params[i]
                    res.set(i, params[i])
                }
                res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        })
    },
    // 批量删除数据
    DelMore: (tableName, objectIds) => {
        let query = Bmob.Query(tableName)
        // 查询某一字段值在某一集合中的记录
        query.containedIn('objectId', objectIds)
        // 获取对象并删除
        return new Promise((resolve, reject) => {
            query.find().then(todos => {
                todos.destroyAll().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        })
    },
    // 批量修改数据
    EditMore: (tableName, objectIds, params) => {
        let query = Bmob.Query(tableName)
        query.containedIn('objectId', objectIds)
        // 获取对象并修改
        return new Promise((resolve, reject) => {
            query.find().then(todos => {
                // 循环执行set操作
                for (let i in params) {
                    // 对参数进行空处理
                    params[i] = params[i] == null ? '' : params[i]
                    todos.set(i, params[i])
                }
                todos.saveAll().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        })
    }
}
