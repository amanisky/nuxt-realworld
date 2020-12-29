<template>
<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link exact :to="{ query: { tab: 'your_feed' } }" :class="{ active:  tab === 'your_feed'}" class="nav-link">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link exact :to="{ query: { tab: 'global_feed' } }" :class="{ active:  tab === 'global_feed'}" class="nav-link">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link exact :to="{ query: { tab: 'tag', tag } }" :class="{ active:  tab === 'tag'}" class="nav-link">#{{ tag }}</nuxt-link>
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
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: article.favorited }" :disabled="article.pendding" @click="toggleFavorite(article)">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <nav>
          <ul class="pagination">
            <li class="page-item" v-for="item in totalPage" :key="item" :class="{ active: item === page }">
              <nuxt-link class="page-link" :to="{ name: 'home', query: { page: item, tag, tab } }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{ query: { tag, tab: 'tag' } }" v-for="(tag, index) in tags" :key="index" class="tag-pill tag-default">{{ tag }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticleList, getFeedArticleList, addFavorite, removeFavorite } from '@/api/article'
import { getAllTag } from '@/api/tag'
export default {
  name: 'home',
  components: {},
  props: {},
  watchQuery: ['page', 'tag', 'tab', 'limit'],
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page) || 1
    const limit = Number.parseInt(query.limit) || 20
    const tag = query.tag || ''
    const tab = query.tab || 'global_feed'

    const getArticleFn = store.state.user && tab === 'your_feed' ? getFeedArticleList : getArticleList
    const [ articleRes, tagRes ] = await Promise.all([
      getArticleFn({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getAllTag()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    articles.forEach(item => item.pendding = false)
    return {
      articles,
      articlesCount,
      page,
      limit,
      tag,
      tags,
      tab
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async toggleFavorite (article) {
      article.pendding = true
      if (article.favorited) {
        await removeFavorite(article.slug)
        article.favoritesCount--
        article.favorited = false
      } else {
        await addFavorite(article.slug)
        article.favoritesCount++
        article.favorited = true
      }
      article.pendding = false
    }
  }
}
</script>

<style>

</style>