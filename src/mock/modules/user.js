const users = [{
        userId: "admin",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        gender: "女",
        username: 18376686974,
        password: 123456,
        realName: "超级管理员",
        nickName: "xLong",
        token: 'admin-token',
        roles: ['admin'],
    },
    {
        userId: "manager",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        gender: "男",
        username: 17777075292,
        password: 666666,
        realName: "普通用户",
        nickName: "小六子",
        token: 'manager-token',
        roles: ['manager'],
    },
    {
        userId: "user",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        gender: "男",
        username: 18888888888,
        password: 666666,
        realName: "普通用户",
        nickName: "超级英雄",
        token: 'user-token',
        roles: ['user'],
    }
]

export default [{
        url: "/api/user/login",
        method: "post",
        response: config => {
            const {
                username,
                password
            } = config.body

            const user = users.find(e => (e.username == username && e.password == password));

            // mock error
            if (!user) {

                return {
                    code: 404,
                    message: '用户名密码不正确',
                    data: null,
                }
            } else {
                return {
                    code: 200,
                    message: "success",
                    data: user,
                }
            }


        }
    }, {
        url: "/api/user/info",
        method: "get",
        response: config => {
            const {
                token
            } = config.query

            const user = users.find(e => (e.token === token));

            // mock error
            if (!user) {

                return {
                    code: 404,
                    message: '用户名不存在',
                    data: null,
                }
            } else {
                return {
                    code: 200,
                    message: "success",
                    data: user,
                }
            }
        }
    },
    {
        url: "/api/user/logout",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "success",
                data: null,
            }
        }
    }
]