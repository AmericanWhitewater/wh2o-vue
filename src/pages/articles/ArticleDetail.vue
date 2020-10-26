<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div v-if="article">
        <div class="display-1">{{ article.title }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click.exact="loadArticle" @keydown.enter="loadArticle">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleDetail',
  data: () => ({
    breadcrumbs: [
      {
        text: 'Articles',
        to: '/articles/list',
        exact: true
      },
      {
        text: 'Edit Article'
      }
    ]
  }),
  computed: {
    ...mapState({
      article: (state) => state.ArticleDetail.data,
      loading: (state) => state.ArticleDetail.loading,
      error: (state) => state.ArticleDetail.error
    })
  },
  created() {
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      this.$store.dispatch('ArticleDetail/getProperty',{
        url: `/article?articleid=${this.$route.params.id}`
      })
    }
  }
}
</script>
