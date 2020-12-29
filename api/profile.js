import { request } from '@/plugins/axios'

/**
 * 用户详情
 * @param { String } username 用户名
 */
export function getProfile (username) {
  return request.get(`/profiles/${username}`)
}

/**
 * 关注
 */
export function followProfile (username) {
  return request.post(`/profiles/${username}/follow`)
}

/**
 * 取消关注
 */
export function unfollowProfile (username) {
  return request.delete(`/profiles/${username}/follow`)
}