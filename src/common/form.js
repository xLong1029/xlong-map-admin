/*
 * 模块 : 表单相关事件
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-06-01
 * 版本 : version 1.0
 */
import { ElMessage } from "element-plus";

export default function () {
  /**
   * 判断表单校验状态
   * @param {Object} form 表单对象
   * @param {String} errorText 校验失败提示语
   */
  function validForm(form, errorText) {
    return new Promise((resolve, reject) => {
      return form.validate((valid) => {
        if (!valid) {
          ElMessage.error(errorText);
          resolve(false);
        } else resolve(true);
      });
    });
  }

  return {
    validForm,
  };
}
