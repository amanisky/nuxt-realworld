// 已登录，不允许访问登录、注册页。
export default ({ store, redirect }) => {
  if (store.state.user) {
    return redirect({ name: 'home' })
  }
}