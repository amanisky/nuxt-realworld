<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
              <input type="text" v-model="article.title" required class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
              <input type="text" v-model="article.description" required class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control" v-model="article.body" required rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" @keydown.enter.prevent="addTag($event)" placeholder="Enter tags">
              <div class="tag-list">
                <span class="tag-default tag-pill" v-for="(tag, index) in article.tagList" :key="index">
                  <i class="ion-close-round" @click="removeTag(index)"></i>
                  {{ tag }}
                </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticle, updateArticle, getArticle } from '@/api/article'
export default {
  name: 'editor',
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  async mounted () {
    if (this.$route.query.slug) {
      const { data } = await getArticle(this.$route.query.slug)
      this.article = data.article
    }
  },
  methods: {
    async onSubmit () {
      const fn = this.article.slug ? updateArticle : createArticle
      const { data } = await fn({ article: this.article })
      this.$router.push({
        name: 'article',
        params: {
          slug: data.article.slug
        }
      })
    },

    addTag (e) {
      this.article.tagList.push(e.target.value)
      e.target.value = ''
    },

    removeTag (key) {
      this.article.tagList.splice(key, 1)
    }
  }
}
</script>

<style>

</style>