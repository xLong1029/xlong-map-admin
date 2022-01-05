// 不能使用import.meta.xxx
import accountManage from "./modules/account-manage.js";
import user from "./modules/user.js";
import list from "./modules/list.js";
import map from "./modules/map.js";
const mocks = [...accountManage, ...user, ...list, ...map];
export default mocks;
