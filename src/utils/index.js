import settings from "@/settings";

/**
 * 根据时间辍返回对应的时间 如 YYYY-MM-DD HH:mm:ss  YYYY-MM-DD
 * @param {Object} date 时间对象
 * @param {String} format 时间格式 默认返回年月日时分秒 按照的格式化是 YYYY-MM-DD HH:mm:ss
 * @param {String} dateWord 默认返回2018年01月15日 如填写 - 的。则返回 2018-01-15
 * @param {String} timeWord 默认返回16时26分30秒 如填写 : 的。则返回 16:26:30
 */
export function timeTrans(
    date,
    format = "YYYY-MM-DD HH:mm:ss",
    dateWord = "",
    timeWord = ""
) {
    const YType = dateWord === "" ? "年" : dateWord;
    const MType = dateWord === "" ? "月" : dateWord;
    const DType = dateWord === "" ? "日" : "";

    const hType = timeWord === "" ? "时" : timeWord;
    const mType = timeWord === "" ? "分" : timeWord;
    const sType = timeWord === "" ? "秒" : "";

    let dataValue = "";
    const Y = date.getFullYear() + YType;
    const M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + MType;
    const D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + DType;
    const h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + hType;
    const m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        mType;
    const s =
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
        sType;
    switch (format) {
        case "YYYY-MM-DD HH:mm:ss":
            dataValue = Y + M + D + " " + h + m + s;
            break;
        case "YYYY":
            dataValue = date.getFullYear().toString();
            break;
        case "MM":
            dataValue = M.substring(0, M.length - 1);
            break;
        case "DD":
            dataValue = D.substring(0, D.length - 1);
            break;
        case "YYYY-MM":
            dataValue = Y + M.substring(0, M.length - 1);
            break;
        case "YYYY-MM-DD":
            dataValue = Y + M + D;
            break;
        case "MM-DD":
            dataValue = M + D.substring(0, D.length - 1);
            break;
        case "HH":
            dataValue = h.substring(0, h.length - 1);
            break;
        case "mm":
            dataValue = m.substring(0, m.length - 1);
            break;
        case "ss":
            dataValue = s.toString();
            break;
        case "HH:mm":
            dataValue = h + m.substring(0, m.length - 1);
            break;
        case "HH:mm:ss":
            dataValue = h + m + s;
            break;
        case "mm:ss":
            dataValue = m + s;
            break;
        default:
            throw new Error("没有找到对应的时间");
    }
    return dataValue;
}

/**
 * 获取参数对象
 *
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf("?") + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

/**
 * 清除数组
 *
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return "";
    return cleanArray(
        Object.keys(json).map((key) => {
            if (json[key] === undefined) return "";
            return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        })
    ).join("&");
}

/**
 * 参数转对象格式
 *
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split("?")[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
        '"}'
    );
}

/**
 * html转Text格式
 *
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement("div");
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

/**
 * 合并两个对象，赋予最后一个优先级
 *
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== "object") {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }

    Object.keys(source).forEach((property) => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === "object") {
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            target[property] = sourceProperty;
        }
    });
    return target;
}

/**
 * 防抖动
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * 深克隆
 *
 * @param {Array} source
 */
export function deepClone(source) {
    const copy = JSON.stringify(source);
    return JSON.parse(copy);
}

/**
 * 数组去重
 *
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr));
}

/**
 * 判断元素是否包含类名
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 给元素添加类名
 *
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * 从元素上移除类名
 *
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}

/**
 * 给元素切换类名
 *
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += "" + className;
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

/**
 * 数组转字符串
 *
 * @param {Array} arr 数组
 * @param {String} l 拼接符
 * @returns {String}
 */
export function arrToStr(arr, l) {
    return arr.join(l);
}

/**
 * 字符串转数组
 *
 * @param {String} string 字符串
 * @param {String} s 分隔符
 * @returns {Array}
 */
export function strToArr(string, s) {
    return string.split(s);
}

/**
 * 数组限制器
 *
 * @param {Array} list 数组列表
 * @param {String | Number} start 起始下标
 * @param {String | Number} limit 每页条数
 * @returns {Array}
 */
export function limitArr(list, start, limit) {
    return list.filter(
        (item, index) => index < limit * start && index >= limit * (start - 1)
    );
}

/**
 * 获取页面滚动高度
 *
 * @returns {Number}
 */
export function getScrollTop() {
    let scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    } else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

/**
 * 获取url传值参数
 *
 * @param {String} name 参数名
 * @param {String} thisUrl url地址，若不传则获取当前地址
 */
export function getUrlQuery(name, thisUrl) {
    const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    const url = thisUrl || location.href;
    if (reg.test(url)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    else return false;
}

/**
 * 输出信息
 *
 * @returns {*} msg
 */
export function logInfo(msg) {
    const NODE_ENV =
        import.meta.env.NODE_ENV;
    if (NODE_ENV !== "production") {
        console.log(msg);
        return true;
    }
    return false;
}

/**
 * base64转为Blob
 *
 * @param {*} dataurl base64字符串
 */
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * Blob流转换为base64
 *
 * @param {*} blob
 * @param {*} callback 回调
 */
export function blobToDataURI(blob, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(e) {
        console.log(e);
        callback(e.target.result);
    };
}

/**
 * base64转换为file
 *
 * @param {*} blob
 * @param {*} filname 文件名
 */
export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/**
 * 通过Url下载文件
 *
 * @param {Nmuber} url 路径
 * @param {String} fileName 名称
 */
export function downloadFileByUrl(url, fileName) {
    // 创建a标签
    const a = window.document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // 设置下载名称
    a.download = fileName;
    document.body.appendChild(a);
    // 触发标签点击事件
    a.click();
    document.body.removeChild(a);
    // 释放URL
    window.URL.revokeObjectURL(url);
}

/**
 * 通过文件流下载文件
 *
 * @param {Nmuber} data 数据
 * @param {String} fileName 名称
 */
export function downloadFileByStream(data, fileName, type) {
    let blob = type ? new Blob([data], { type }) : new Blob([data]);

    // 判断是否有msSaveOrOpenBlob，在客户端上以本地方式保存文件（任意大小），方法如同从 Internet 下载文件
    if (typeof window.navigator.msSaveOrOpenBlob === "function") {
        // msSaveBlob只能保存，不能在线打开
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        // 创建URL
        const objectUrl = window.URL.createObjectURL(blob);
        downloadFileByUrl(objectUrl, fileName);
    }
}

/**
 * 删除对象指定属性
 *
 * @param {*} obj 对象
 * @param {*} uselessKeys 不需要的属性序列
 */
export function objOmit(obj, uselessKeys) {
    if (!uselessKeys.length) return obj;

    const objCopy = {...obj };
    uselessKeys.forEach((key) => delete objCopy[key]);
    return objCopy;
}

/**
 * 加密（简单模拟）
 *
 * @param {*} value 值
 */
export function encrypt(value) {
    let code = "";
    for (let i = 0; i < value.length; i++) {
        const r = value.charCodeAt(i);
        code += String.fromCharCode(r + 2);
    }
    // 对字符串进行特殊字符编码，分号（;）、逗号（,）、等号（=）以及空格问题
    return escape(code);
}

/**
 * 解密（简单模拟）
 *
 * @param {*} value 值
 */
export function decrypt(value) {
    // 对字符串进行特殊字符解码，分号（;）、逗号（,）、等号（=）以及空格问题
    value = unescape(value);
    let correct = "";
    for (let i = 0; i < value.length; i++) {
        const r = value.charCodeAt(i);
        correct += String.fromCharCode(r - 2);
    }
    return correct;
}

/**
 * localstorage写入本地缓存
 *
 * @param {*} key key名
 * @param {*} value 值
 */
export function setLocalS(key, value) {
    localStorage.setItem(key, value);
}

/**
 * localstorage获取本地缓存
 *
 * @param {*} key key名
 */
export function getLocalS(key) {
    const res = localStorage.getItem(key);
    if (res && res !== "null") return res;
    else return false;
}

/**
 * localstorage删除本地储存
 *
 * @param {*} key key名
 */
export function delLocalS(key) {
    localStorage.removeItem(key);
}

/**
 * localstorage清空所有本地储存
 */
export function clearLocalS() {
    localStorage.clear();
}

/**
 * 比较日期大小
 *
 * @param {*} dateOne 第一个日期
 * @param {*} dateTwo 第二个日期
 */
export function compareDate(dateOne, dateTwo) {
    // 字符串
    if (typeof dateOne === "string" && typeof dateTwo === "string") {
        return new Date(dateOne).getTime() <= new Date(dateTwo).getTime();
    }
    // DATE对象
    else if (typeof dateOne === "object" && typeof dateTwo === "object")
        return dateOne <= dateTwo;
    else {
        console.log("日期比较格式不统一");
        return false;
    }
}

/**
 * 通过身份证号获取信息
 *
 * @param {*} IDCard 身份证号码
 */
export function getInfoByIDCard(IDCard) {
    // 获取出生日期
    const birth =
        IDCard.substring(6, 10) +
        "-" +
        IDCard.substring(10, 12) +
        "-" +
        IDCard.substring(12, 14);
    // 获取性别
    const gender = parseInt(IDCard.substr(16, 1)) % 2 == 1 ? "男" : "女";
    // 获取年龄
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let age = date.getFullYear() - IDCard.substring(6, 10) - 1;
    if (
        IDCard.substring(10, 12) < month ||
        (IDCard.substring(10, 12) == month && IDCard.substring(12, 14) <= day)
    ) {
        age++;
    }

    return {
        birth,
        gender,
        age,
    };
}

/**
 * 获取页面标题
 *
 * @param {*} pageTitle 页面标题
 */
export function getPageTitle(pageTitle) {
    const title = settings.sysTitle || "XLONG家里蹲地图系统";

    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}

/**
 * 根据指定字段获取数组数据的索引
 * @param {*} value 判断值
 * @param {*} data 数据
 * @param {*} key 字段名
 * @returns index
 */
export function findDataIndex(data, value, key = "id") {
    return data.findIndex((e) => e[key] === value);
};

/**
 * 获取缓存数据(数组类型)
 * @param {*} itemName 名称
 * @returns array 返回数组
 */
export function getCacheArray(itemName) {
    return getLocalS(itemName) ? JSON.parse(getLocalS(itemName)) : [];
};