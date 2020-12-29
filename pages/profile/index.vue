<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" alt="头像" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>{{ profile.bio }}</p>
          <button v-if="user.username !== profile.username" :disabled="pendding" @click="toggleFollow(profile)" class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }} 
          </button>
          <nuxt-link v-else :to="{ name: 'settings' }" class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-gear-a"></i> Edit Profile Settings
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :to="{ query: { tab: 'my' } }" :class="{ active: tab === 'my' }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :to="{ query: { tab: 'favorited' } }" :class="{ active: tab === 'favorited' }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :disabled="pendding" @click="toggleFavorite(article)">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">{{ tag }}</li>
            </ul>
          </nuxt-link>
        </div>

        <nav>
          <ul class="pagination">
            <li class="page-item" v-for="item in totalPage" :key="item" :class="{ active: item === page }">
              <nuxt-link class="page-link" :to="{ query: { page: item } }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>

      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticleList, addFavorite, removeFavorite } from '@/api/article'
import { getProfile, followProfile, unfollowProfile } from '@/api/profile'
export default {
  name: 'profile',
  middleware: 'authenticated',
  watchQuery: ['page', 'limit', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  async asyncData({ params, query }) {
    const page = Number.parseInt(query.page) || 1
    const limit = Number.parseInt(query.limit) || 3
    const tab = query.tab || 'my'
    const filter = tab === 'favorited' ? { favorited: params.username, limit, offset: (page - 1) * limit } : { author: params.username, limit, offset: (page - 1) * limit }
    const [profileResult, articleListResult] = await Promise.all([
      getProfile(params.username),
      getArticleList(filter)
    ])
    return {
      page,
      limit,
      tab,
      profile: profileResult.data.profile,
      articles: articleListResult.data.articles,
      articlesCount: articleListResult.data.articlesCount
    }
  },
  data () {
    return {
      pendding: false
    }
  },
  methods: {
    async toggleFollow ({ following, username }) {
      this.pendding = true
      if (following) {
        await unfollowProfile(username)
      } else {
        await followProfile(username)
      }
      this.profile.following = !following
      this.pendding = false
    },

    async toggleFavorite (article) {
      this.pendding = true
      if (article.favorited) {
        await removeFavorite(article.slug)
        article.favoritesCount--
      } else {
        await addFavorite(article.slug)
        article.favoritesCount++
      }
      article.favorited = !article.favorited
      this.pendding = false
    }
  }
}
</script>

<style>

</style>