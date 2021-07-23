/* eslint-disable */
import { Message } from "element-ui";
// 校验
import { validBusinessName, validGroundCode } from "./validate";

/**
 * 判断表单校验状态
 * @param {Object} form 表单对象
 * @param {String} errorText 校验失败提示语
 */
export function validForm(form, errorText) {
  return new Promise((resolve, reject) => {
    return form.validate((valid) => {
      if (!valid) {
        Message.error(errorText);
        resolve(false);
      } else resolve(true);
    });
  });
}

/**
 * 校验表单附件上传
 * @param {rule} 规则
 * @param {value} 表单值
 * @param {callback} 回调
 * @param {vueObj} 实例
 * @param {form} 表单对象
 * @param {attr} 属性名
 * @param {attachmentName} 附件名称
 */
export const validateAttachment = (rule, value, callback, vueObj, form = 'form1', attr, attachmentName) => {
  if (!vueObj[form][attr] || !vueObj[form][attr].length) {
    callback(new Error(`请上传${attachmentName}`));
  } else {
    callback();
  }
};

/**
 * 校验表单业务名称
 * @param {rule} 规则
 * @param {value} 表单值
 * @param {callback} 回调
 */
export const validateBusinessName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入业务名称"));
  } else if (!validBusinessName(value)) {
    callback(new Error("业务名称格式有误，不能包含特殊字符"));
  } else {
    callback();
  }
};

/**
 * 校验表单动产单元号（宗地号）
 * @param {rule} 规则
 * @param {value} 表单值
 * @param {callback} 回调
 */
export const validateGroundCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入不动产单元号（宗地号）"));
  } else if (!validGroundCode(value)) {
    callback(
      new Error("宗地号格式有误，宗地号为19位宗地统一代码，如：450103001001GB00001")
    );
  } else {
    callback();
  }
};

/**
 * 不动产预核业务即时办理
 * 校验表单动产单元号（宗地号）
 * @param {rule} 规则
 * @param {value} 表单值
 * @param {callback} 回调
 */
export const validateAutoGroundCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入不动产单元号（宗地号）"));
  } else if (value.length != 7 && value.length != 19) {
    callback(
      new Error("宗地号格式有误，宗地号长度为7或者19，如：450103001001GB00001")
    );
  }
  else {
    if (value.length === 19 && !validGroundCode(value)) {
      callback(
        new Error("宗地号格式有误，宗地号为19位宗地统一代码，如：450103001001GB00001")
      );
    } else {
      callback();
    }

  }
};
