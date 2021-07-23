import Cookies from 'js-cookie'

const TokenKey = 'SDC-Token'
// 单位切换涉及业务详情中，业主单位名称改变，后端有用到该cookie获取单位信息，测试库没问题，本地无法重现（可无视）
const CIDKey = 'SDC-CID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCompanyID() {
  return Cookies.get(CIDKey)
}

export function setCompanyID(id) {
  return Cookies.set(CIDKey, id)
}

export function removeCompanyID() {
  return Cookies.remove(CIDKey)
}
