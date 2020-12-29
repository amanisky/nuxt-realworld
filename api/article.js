import { request } from '@/plugins/axios'

/**
 * @typedef { Object } Article 文章类型
 * @property { String } title 标题
 * @property { String } body 正文
 * @property { String } description 描述
 * @property { Array } tagList 标签列表
 */

/**
 * 新增
 * @param { Article } data 文章数据
 */
export function createArticle (data) {
  return request.post('/articles', data)
}

/**
 * 删除
 * @param { String } slug 文章唯一标识
 */
export function removeArticle (slug) {
  return request.delete(`/articles/${slug}`)
}

/**
 * @typedef { Object } Filter 查询条件
 * @property { String } tag 标签
 * @property { String } author 作者
 * @property { String } favorited 收藏
 * @property { Number } limit 每页条数
 * @property { Number } offset 页码
 */

/**
 * 列表
 * @param { Filter } params 查询条件
 */
export function getArticleList (params) {
  return request.get('/articles', { params })
}

/**
 * 关注
 * @param { Filter } params 查询条件
 */
export function getFeedArticleList (params) {
  return request.get('/articles/feed', { params })
}

/**
 * 详情
 * @param { String } slug 文章唯一标识
 */
export function getArticle (slug) {
  return request.get(`/articles/${slug}`)
}

/**
 * 编辑
 * @param { String } slug 文章唯一标识
 * @param { Article } data 文章数据data
 */
export function updateArticle (data) {
  return request.put(`/articles/${data.article.slug}`, data)
}

/**
 * 添加点赞
 * @param { String } slug 文章唯一标识
 */
export function addFavorite (slug) {
  return request.post(`/articles/${slug}/favorite`)
}

/**
 * 取消点赞
 * @param { String } slug 文章唯一标识
 */
export function removeFavorite (slug) {
  return request.delete(`/articles/${slug}/favorite`)
}

/**
 * 获取文章评价列表
 */
export function getArticleCommentList (slug) {
  return request.get(`/articles/${slug}/comments`)
}

/**
 * 添加评论
 */
export function addArticleComment ({ slug, ...data }) {
  return request.post(`/articles/${slug}/comments`, data)
}

/**
 * 删除评论
 */
export function removeArticleComment ({ slug, id }) {
  return request.delete(`/articles/${slug}/comments/${id}`)
}