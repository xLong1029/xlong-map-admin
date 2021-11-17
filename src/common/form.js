/*
 * 模块 : 表单相关模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-09-06
 * 版本 : version 1.0
 */

import { ElMessage } from "element-plus";
// 校验
import {
  validMobile,
  validRealName,
  validPhone,
  validEmail
} from "utils/validate.js";

export default function() {
  /**
   * 判断表单校验状态
   * @param {Object} form 表单对象
   * @param {String} errorText 校验失败提示语
   */
  const validForm = (form, errorText) => {
    return new Promise(resolve => {
      form.validate(valid => {
        if (!valid) {
          ElMessage.error(errorText || "信息填写有误，请检查");
          resolve(false);
        } else resolve(true);
      });
    });
  };

  /**
   * 校验表单手机号码
   * @param rule 规则
   * @param value 表单值
   * @param callback 回调
   */
  const validateMobile = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入手机号码"));
    } else if (!validMobile(value)) {
      callback(new Error("请输入正确的手机号码"));
    }
    callback();
  };

  /**
   * 校验表单真实姓名（只支持中文）
   * @param rule 规则
   * @param value 表单值
   * @param callback 回调
   */
  const validateRealName = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入真实姓名"));
    } else if (!validRealName(value)) {
      callback(new Error("请输入正确的中文姓名"));
    }
    callback();
  };

  /**
   * 校验表单普通电话(包含手机和座机)
   * @param rule 规则
   * @param value 表单值
   * @param callback 回调
   */
  const validatePhone = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入电话号码"));
    } else if (!validPhone(value)) {
      callback(new Error("请输入正确的电话号码"));
    }
    callback();
  };

  /**
   * 校验表单电子邮箱
   * @param rule 规则
   * @param value 表单值
   * @param callback 回调
   */
   const validateEmail = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入电子邮箱"));
    } else if (!validEmail(value)) {
      callback(new Error("请输入正确的电子邮箱"));
    }
    callback();
  };

  return {
    validForm,
    validateMobile,
    validateRealName,
    validatePhone,
    validateEmail
  };
}
