import { handleMock, handleResponse } from "./../mock-handle.js";
import { professionList, jobList } from "./list.js";
import Mock from "mockjs";

const genders = ["男", "女"];

const list = Mock.mock({
    // 10-20 个元素的数组
    'list|10-20': [{
        // 自增数，起始值为 1，每次增 1
        'sid|+1': 1,
        // 5位的随机码
        'userId|5': '',
        realname: "张三",
        // 取数组当中的一个值
        "gender|1": ["男", "女"],
        mobile: "18374458456",
        // 随机email
        'email': '@email',
        'job|1': jobList.map(e => e.name),
        // 一个 yyyy-MM-dd hh:mm:ss 的随机时间
        'createdTime': '@date("yyyy-MM-dd hh:mm:ss")',
        "profession|1-4": professionList.map(e => e.name),
        "enabledState|1": [1, -1],
    }],
})

console.log(list);

export default [
    {
        url: "/api/account/list",
        method: "get",
        response: (config) =>
            handleMock(config, () => {
                return handleResponse(200, "success", list);
            }),
    },
];
