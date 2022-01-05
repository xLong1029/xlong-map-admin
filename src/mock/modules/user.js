
import { handleMock, handleResponse } from "./../mock-handle.js";

const users = [{
    username: 18376686974,
    password: 123456,
    token: '0aks73hhd8xjsu394',
    userId: "ozdUQQQe"
},
{
    username: 17777075292,
    password: 123456,
    token: 'a7f441154089e22b80f17c338e5d2a4e',
    userId: "aDKHTTTk"
},
{
    username: 18888888888,
    password: 666666,
    token: '0osi7u3hfydg28xus7',
    userId: "LKdsAAAF"
}]

const infos = [{
    userId: "ozdUQQQe",
    avatar: "http://xlongadmin.xlong.club/2020/11/30/5d14ade440fbf67980d98ff08672de8a.png",
    gender: "女",
    username: 18376686974,
    realName: "小六子",
    nickName: "xLong",
    roles: 'admin',
},
{
    userId: "aDKHTTTk",
    avatar: "http://xlongadmin.xlong.club/2020/01/08/61afcdfa40d8bb1a80e8c25ed65d8ba7.jpg",
    gender: "男",
    username: 17777075292,
    realName: "Lio.Huang",
    nickName: "琛小黑",
    roles: 'manage',
},
{
    userId: "LKdsAAAF",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    gender: "男",
    username: 18888888888,
    realName: "夏普",
    nickName: "小朋友",
    roles: 'user',
}]

export default [
    {
        url: "/api/user/login",
        method: "post",
        response: config => handleMock(config, ({ config }) => {
            const {
                username,
                password
            } = config.body

            const user = users.find(e => (e.username == username && e.password == password));

            if(user){
                const { token, userId } = user;
                const info = infos.find(e => e.userId === userId);
                return handleResponse(200, "success", { ...info, token });
            }
            else{
                return handleResponse(404, "找不到该用户")
            }
        })
    },
    {
        url: "/api/user/info",
        method: "get",
        response: config => handleMock(config, ({ token }) => {
            
            const user = users.find(e => (e.token == token));
            console.log(user);

            if(user){
                const info = infos.find(e => e.userId === user.userId);
                return handleResponse(200, "success", info)
            }
            else{
                return handleResponse(404, "找不到用户信息")
            }
        })
    },
    {
        url: "/api/user/info/edit",
        method: "post",
        response: config => handleMock(config, ({ token }) => {
            const {
                nickName,
                realName
            } = config.body

            const user = users.find(e => (e.token == token));
            if (user) {
                const index = infos.findIndex(e => e.userId === user.userId);
                infos[index].nickName = nickName;
                infos[index].realName = realName;
                return handleResponse(200, "success", infos[index]);
            }
            else {
                return handleResponse(404, "信息保存失败");
            }
        })
    },
    {
        url: "/api/user/password/edit",
        method: "post",
        response: config => handleMock(config, ({ token }) => {
            const {
                oldPassword,
                newPassword
            } = config.body

            const index = users.findIndex(e => (e.token == token));

            if (index >= 0) {
                if(users[index].password == oldPassword){
                    users[index].password = newPassword;
                    return handleResponse(200, "success");
                }
                else{
                    return handleResponse(403, "旧密码错误");
                }
            }
            else {
                return handleResponse(404, "密码修改失败");
            }
        })
    },
    {
        url: "/api/user/logout",
        method: "post",
        response: () => handleResponse(200, "success")
    }
]