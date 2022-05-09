import { handleMock, handleResponse } from "./../mock-handle.js";
import { professionList, jobList } from "./list.js";
import Mock from "mockjs";
const Random = Mock.Random;

const phonePrefixs = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177");

let account = Mock.mock({
    // 10-20 个元素的数组
    'list|10-20': [{
        // 自增数，起始值为 1，每次增 1
        'sid|+1': 1,
        // 取数组当中的一个值
        "gender|1": ["男", "女"],
        // 随机email
        'email': '@email',
        'job|1': jobList.map(e => e.name),
        // 一个 yyyy-MM-dd hh:mm:ss 的随机时间
        'createdTime': '@date("yyyy-MM-dd hh:mm:ss")',
        'enabledState|1': [1, -1],
    }],
})

account.list.forEach(e => {
    // 随机guid
    e.userId = Random.guid();
    // 随机身份证
    // e.idCard = Random.id();
    // 随机人名
    e.realname = Random.cname();
    // 随机取2-4个不重复的值
    e.profession = Random.pick(professionList.map(e => e.name), 2, 4);
    // 随机手机号
    e.mobile = phonePrefixs[Math.floor(Math.random() * phonePrefixs.length)] + Mock.mock(/\d{8}/);
});

export default [
    {
        url: "/api/account/list",
        method: "get",
        response: (config) =>
            handleMock(config, () => {
                const {
                    params,
                    pageNo,
                    pageSize
                } = config.query;

                const { keyword, enabledState } = JSON.parse(params);

                const page = parseInt(pageNo);
                const size = parseInt(pageSize);
                let list = JSON.parse(JSON.stringify(account.list));

                if (keyword) {
                    list = list.filter(e => (e.userId == keyword || e.realname == keyword || e.mobile == keyword || e.email == keyword))
                }
                if (enabledState) {
                    list = list.filter(e => e.enabledState == enabledState);
                }

                const filterList = JSON.parse(JSON.stringify(list))

                list = list.slice((page - 1) * size, page * size)

                return handleResponse(200, "success", {
                    list,
                    page: {
                        count: filterList.length,
                        page,
                        size,
                    }
                });
            }),
    },
    {
        url: "/api/account/info",
        method: "get",
        response: (config) =>
            handleMock(config, () => {
                const {
                    id
                } = config.query;

                const user = account.list.find(e => e.userId == id);

                return user ? handleResponse(200, "success", user) : handleResponse(404, "找不该用户");;
            }),
    },
    {
        url: "/api/account/add",
        method: "post",
        response: (config) =>
            handleMock(config, () => {
                let data = {...config.body};

                const user = account.list.find(e => (e.mobile == data.mobile || e.email == data.email));
                if(user){
                    if(user.mobile == data.mobile){
                        return handleResponse(400, "手机号码已存在");
                    }
                    if(user.email == data.email){
                        return handleResponse(400, "电子邮箱已存在");
                    }
                }

                data.sid = account.list[account.list.length - 1].sid + 1;
                data.userId = Random.guid();
                data.createdTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');

                account.list.unshift(data);
                return handleResponse(200, "success", data.userId);
            }),
    },
    {
        url: "/api/account/delete",
        method: "post",
        response: (config) =>
            handleMock(config, () => {
                const { ids } = config.body;
                account.list = account.list.filter(e => !ids.includes(e.userId))

                return handleResponse(200, "success");
            }),
    },
    {
        url: "/api/account/edit",
        method: "post",
        response: (config) =>
            handleMock(config, () => {
                const data = {...config.body};
                
                const user = account.list.find(e => ((e.mobile == data.mobile || e.email == data.email) && e.userId != data.userId));

                if(user){
                    if(user.mobile == data.mobile){
                        return handleResponse(400, "手机号码已存在，请修改");
                    }
                    if(user.email == data.email){
                        return handleResponse(400, "电子邮箱已存在，请修改");
                    }
                }

                const index = account.list.findIndex(e => (e.userId == data.userId));

                if(index >= 0){
                    account.list[index] = {...config.body};
                    return handleResponse(200, "success");
                }
                else{
                    return handleResponse(404, "找不到用户信息");
                }
            }),
    }
];
