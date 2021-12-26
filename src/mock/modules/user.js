const users = [{
        userId: "ozdUQQQe",
        avatar: "http://xlongadmin.xlong.club/2020/11/30/5d14ade440fbf67980d98ff08672de8a.png",
        gender: "女",
        username: 18376686974,
        password: 123456,
        realName: "小六子",
        nickName: "xLong",
        token: '0aks73hhd8xjsu394',
        roles: 'admin',
    },
    {
        userId: "aDKHTTTk",
        avatar: "http://xlongadmin.xlong.club/2020/01/08/61afcdfa40d8bb1a80e8c25ed65d8ba7.jpg",
        gender: "男",
        username: 17777075292,
        password: 123456,
        realName: "Lio.Huang",
        nickName: "琛小黑",
        token: 'a7f441154089e22b80f17c338e5d2a4e',
        roles: 'manage',
    },
    {
        userId: "LKdsAAAF",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        gender: "男",
        username: 18888888888,
        password: 666666,
        realName: "夏普",
        nickName: "小朋友",
        token: '0osi7u3hfydg28xus7',
        roles: 'user',
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

            console.log(222, config);

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