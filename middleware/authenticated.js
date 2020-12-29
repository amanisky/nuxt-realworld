// 未登录，访问未授权页面会跳转到登录页。
export default ({ store, redirect }) => {
  if (!store.state.user) {
    return redirect({ name: 'login' })
  }
}