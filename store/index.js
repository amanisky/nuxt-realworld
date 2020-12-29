const cookieParser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户
    user: null
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  /**
   * nuxt 中特殊的 action 方法，会在服务端渲染期间自动调用
   * 作用：初始化容器数据、传递数据给客户端使用
   */
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 如果请求头中有 cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转换为对象
      const parsed = cookieParser.parse(req.headers.cookie)
      user = JSON.parse(parsed.user)
    }
    // 初始化容器数据
    commit('setUser', user)
  }
}