import { request } from '@/plugins/axios'

/**
 * @typedef { Object } User 用户信息
 * @property { String } email 邮箱
 * @property { String } password 密码
 * @property { String } username 账号
 */

/**
 * 登录
 * @param { User } data 用户信息
 */
export function login (data) {
  return request.post('/users/login', data)
}

/**
 * 注册
 * @param { User } data 用户信息
 */
export function register (data) {
  return request.post('/users', data)
}
