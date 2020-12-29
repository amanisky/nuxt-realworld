<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLoginPage ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link to="/register" v-if="isLoginPage">Need an account?</nuxt-link>
          <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(msgs, field) in errors">
            <li v-for="(msg, index) in msgs" :key="index + Math.random()">{{ field }} {{ msg }}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLoginPage">
            <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" required class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLoginPage ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/login'

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'login',
  middleware: 'notAuthenticated',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    isLoginPage () {
      return this.$route.name === 'login'
    }
  },
  watchQuery: ['key'],
  methods: {
    async onSubmit () {
      try {
        let result
        if (this.isLoginPage) {
          result = await login({ user: this.user })
        } else {
          result = await register({ user: this.user })
        }
        // 1、将用户信息保存到容器
        this.$store.commit('setUser', result.data.user)
        // 2、防止刷新丢失数据，需要把数据持久化
        Cookie.set('user', result.data.user)
        // 3、跳转到首页
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err.response.data.errors)
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>