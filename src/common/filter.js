import { timeTrans } from "@/utils";

export default function() {
  /**
   * 判断值是否为空，若为空则返回'-'
   * @param value
   */
  function isNull(value) {
    return value && value !== null && value !== undefined && value !== ""
      ? value
      : "-";
  }

  /**
   * 判断值布尔属性，返回是或否
   * @param value
   */
  function formatBoolean(value) {
    return value ? "是" : "否";
  }

  /**
   * 判断值日期属性，返回格式化时间 '2020-01-01 12:12:12'
   * @param value
   */
  function formatDate(value) {
    return value ? timeTrans(value, "YYYY-MM-DD HH:mm:ss", "-", ":") : "";
  }

  return {
    isNull,
    formatBoolean,
    formatDate
  };
}
