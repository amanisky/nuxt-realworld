# 使用 Nuxt 实现 Realworld 项目

## 访问地址

+ [部署成功的访问地址](http://117.50.12.245:3000)

## Realworld 项目介绍

> 一个开源的学习项目，目的是帮助开发者快速学习新技能。

> Realword 提供了页面模板、样式和接口，可以用任何想要学习的技术来实现这个项目

+ [GitHub 仓库地址](https://github.com/gothinkster/realworld)
+ [在线示例](https://demo.realworld.io/#/)
+ [Realworld 页面模板](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)
+ [Realworld 样式文件](http://demo.productionready.io/main.css)
+ [Realworld 接口文档](https://github.com/gothinkster/realworld/tree/master/api)

## 扩展路由

+ 清除生成的默认路由规则，自定义路由规则

```js
// nuxt.config.js
module.exports = {
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
```

## 路由-中间件

+ [路由中间件](https://www.nuxtjs.cn/guide/routing#中间件)
+ 通过路由中间件实现路由登录拦截

## 插件

+ [插件注入上下文](https://www.nuxtjs.cn/guide/plugins#注入-context)
+ 使用插件完成 axios 请求拦截器
+ 使用插件完成格式化日期过滤器

## HTML 头部

+ [个性化特定页面的 Meta 标签](https://www.nuxtjs.cn/guide/views#个性化特定页面的-meta-标签)
+ 可设置标题
+ 利于 SEO