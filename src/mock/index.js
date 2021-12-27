// 不能使用import.meta.xxx
import user from "./modules/user.js";
import list from "./modules/list.js";
import map from "./modules/map.js";
const mocks = [...user, ...list, ...map];
export default mocks;
