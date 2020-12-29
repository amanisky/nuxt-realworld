<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" required class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-outline-danger pull-xs-left" type="button" @click="logout">
                Or click here to logout.
              </button>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'settings',
  middleware: 'authenticated',
  data () {
    return {
      user: {
        username: '',
        password: '',
        bio: '',
        image: '',
        email: ''
      }
    }
  },
  async mounted () {
    const { data } = await getUser()
    this.user = data.user
  },
  methods: {
    logout () {
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'home' })
    },

    async onSubmit () {
      const { data } = await updateUser({ user: this.user })
      this.$store.commit('setUser', data.user)
      Cookie.set('user', data.user)
      this.$router.push({ name: 'profile', params: { username: data.user.username } })
    }
  }
}
</script>

<style>

</style>