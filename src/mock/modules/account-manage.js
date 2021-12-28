import { handleMock, handleResponse } from "./../mock-handle.js";
import { professionList, jobList } from "./list.js";
import Mock from "mockjs";
const Random = Mock.Random;

const genders = ["男", "女"];

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
        "profession|1-4": professionList.map(e => e.name),
        "enabledState|1": [1, -1],
    }],
})

account.list.forEach(e => {
    // 随机guid
    e.userId = Random.guid();
    // 随机身份证
    e.idCard = Random.id();
    // 随机人名
    e.realname = Random.cname();
    // 随机手机号
    e.mobile = phonePrefixs[Math.floor(Math.random() * phonePrefixs.length)] + Mock.mock(/\d{8}/);
});


export default [
    {
        url: "/api/account/list",
        method: "get",
        response: (config) =>
            handleMock(config, () => {
                // console.log(config);
                const {
                    params,
                    pageNo,
                    pageSize
                } = config.query;

                const page = parseInt(pageNo);
                const size = parseInt(pageSize);
                const list = account.list.slice((page - 1) * size, page * size)

                return handleResponse(200, "success", {
                    list: list,
                    page: {
                        count: account.list.length,
                        page,
                        size,
                    }
                });
            }),
    },
];
