<template>
<div class="article-meta">
  <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
  <div class="info">
    <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">{{ article.author.username }}</nuxt-link>
    <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
  </div>
  <template v-if="!isCurrentUser">
    <button :class="{ active: article.author.following }" :disabled="pendding" @click="toggleFollow" class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }} <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    &nbsp;&nbsp;
    <button :class="{ active: article.favorited }" :disabled="pendding" @click="toggleFavorite" class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </template>
  <template v-else>
    <nuxt-link :to="{ name: 'editor', query: { slug: article.slug } }" class="btn btn-outline-secondary btn-sm">
      <i class="ion-edit"></i> Edit Article
    </nuxt-link>
    &nbsp;&nbsp;
    <button class="btn btn-outline-danger btn-sm" :disabled="pendding" @click="onRemove(article.slug)">
      <i class="ion-trash-a"></i> Delete Article
    </button>
  </template>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { removeArticle, addFavorite, removeFavorite } from '@/api/article'
import { followProfile, unfollowProfile } from '@/api/profile'
export default {
  name: 'article-meta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    isCurrentUser () {
      return this.user.username === this.article.author.username
    }
  },
  data () {
    return {
      pendding: false
    }
  },
  methods: {
    async onRemove (slug) {
      this.pendding = true
      await removeArticle(slug)
      this.$router.push({ name: 'home' })
    },

    async toggleFollow () {
      this.pendding = true
      if (this.article.author.following) {
        await unfollowProfile(this.article.author.username)
      } else {
        await followProfile(this.article.author.username)
      }
      this.article.author.following = !this.article.author.following
      this.pendding = false
    },

    async toggleFavorite () {
      this.pendding = true
      if (this.article.favorited) {
        await removeFavorite(this.article.slug)
        this.article.favoritesCount--
      } else {
        await addFavorite(this.article.slug)
        this.article.favoritesCount++
      }
      this.article.favorited = !this.article.favorited
      this.pendding = false
    }
  }
}
</script>

<style>

</style>