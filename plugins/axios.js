import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
})

// 通过插件机制获取上下文对象（包含：store、params、req、res、app...）
// 插件导出的函数必须是默认导出
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  // 响应拦截器
  request.interceptors.response.use(response => {
    return response
  }, error => {
    return Promise.reject(error)
  })
}