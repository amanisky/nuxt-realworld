module.exports = {
  // 注册插件
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/dayjs.js'
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    linkActiveClass: 'active',
    // 扩展 Nuxt 创建的路由
    extendRoutes(routes, resolve) {
      // 清除 Nuxt 基于 pages 目录生成的默认路由规则
      routes.splice(0)
      // 添加自定义路由规则
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home'),
            },
            {
              path: 'login',
              name: 'login',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              path: 'register',
              name: 'register',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              path: 'profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile'),
            },
            {
              path: 'settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings'),
            },
            {
              path: 'editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor'),
            },
            {
              path: 'article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article'),
            }
          ]
        }
      ])
    }
  }
}