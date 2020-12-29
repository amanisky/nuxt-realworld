import { request } from '@/plugins/axios'

/**
 * @typedef { Object } User 用户信息
 * @property { String } email 邮箱
 * @property { String } password 密码
 * @property { String } username 账号
 * @property { String } bio 简介
 * @property { String } image 头像
 */

/**
 * 修改
 * @param { User } data 用户信息
 */
export function updateUser (data) {
  return request.put('/user', data)
}

/**
 * 详情
 */
export function getUser () {
  return request.get('/user')
}
