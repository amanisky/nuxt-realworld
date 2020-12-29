import { request } from '@/plugins/axios'

// 所有标签
export function getAllTag () {
  return request.get('/tags')
}
