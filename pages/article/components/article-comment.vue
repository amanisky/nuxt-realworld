<template>
<div class="col-xs-12 col-md-8 offset-md-2">

  <form class="card comment-form" @submit.prevent="addComment">
    <div class="card-block">
      <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
    </div>
    <div class="card-footer">
      <img :src="article.author.image" class="comment-author-img" />
      <button class="btn btn-sm btn-primary" :disabled="pendding">
        Post Comment
      </button>
    </div>
  </form>
  
  <div class="card" v-for="(comment, index) in comments" :key="comment.id">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </nuxt-link>
      &nbsp;
      <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">{{ comment.author.username }}</nuxt-link>
      <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      <span class="mod-options" v-if="user.username === comment.author.username"><i class="ion-trash-a" @click="removeComment(index, comment.id)"></i></span>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticleCommentList, addArticleComment, removeArticleComment } from '@/api/article'
export default {
  name: 'article-comment',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      comments: [],
      comment: {
        body: ''
      },
      pendding: false
    }
  },
  async mounted () {
    const { data } = await getArticleCommentList(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async addComment () {
      this.pendding = true
      const { data } = await addArticleComment({ slug: this.article.slug, ...this.comment })
      this.comments.unshift(data.comment)
      this.comment.body = ''
      this.pendding = false
    },

    async removeComment (key, id) {
      const { data } = await removeArticleComment({ slug: this.article.slug, id })
      if (data) {
        this.comments.splice(key, 1)
      }
    }
  }
}
</script>

<style>

</style>