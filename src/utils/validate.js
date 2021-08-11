/**
 * 是否为外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 验证Url地址
 *
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 验证小写字母
 *
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 验证大写字母
 *
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 验证纯字母
 *
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 验证邮箱地址
 *
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 验证手机号码
 *
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
  const reg = /^1(3|4|5|7|8|9)\d{9}$/;
  return reg.test(mobile);
}

/**
 * 验证普通电话(包含手机和座机)
 *
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^(1\d{10}$)|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
  return reg.test(phone);
}

/**
 * 验证密码
 *
 * @param {string} password
 * @returns {Boolean}
 */
export function validPassword(password) {
  const reg = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}/;
  return reg.test(password);
}

/**
 * 是否相等
 *
 * @param {*} str1
 * @param {*} str2
 * @returns {Boolean}
 */
export function isEqual(str1, str2) {
  return str1 === str2;
}

/**
 * 是否为字符串
 *
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 是否为数组
 *
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 *
 * 验证邮政编码
 *
 * @param {string} postCode
 * @returns {Boolean}
 */
export function validPostCode(postCode) {
  const reg = /[1-9]\d{5}(?!\d)/;
  return reg.test(postCode);
}

/**
 *
 * 验证身份证
 *
 * @param {string} idcard
 * @returns {Boolean}
 */
export function validIDcard(idcard) {
  const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return reg.test(idcard);
}

/**
 *
 * 验证真实姓名
 *
 * @param {string} realName
 * @returns {Boolean}
 */
export function validRealName(realName) {
  const reg = /^[\u4E00-\u9FA5](([\u4E00-\u9FA5]|·(?!·))){0,18}[\u4E00-\u9FA5]$/;
  return reg.test(realName);
}