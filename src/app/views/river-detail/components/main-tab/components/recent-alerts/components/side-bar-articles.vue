<template>
  <div class="sidebar-articles">
    <span class="header-row">
      <h4 class="mb-spacing-sm">News</h4>
      <cv-button
        kind="secondary"
        size="small"
        class="mb-spacing-sm"
        :disabled="loading"
        @click.exact="$router.push(`/river-detail/${$route.params.id}/news`)"
      >
        See More
      </cv-button>
    </span>
    <template v-if="loading">
      <div class="pb-spacing-md">
        <cv-inline-loading
          id="cv-inline-loading--articles"
          state="loading"
        />
      </div>
    </template>
    <template v-else-if="articles && articles.length > 0">
      <div
        v-for="(article, i) in articles.slice(0, 1)"
        :key="i + 3 * 4"
        class="bx--row mb-spacing-xs"
       
      >
        <div class="bx--col-sm-12 bx--col-md-3">
          <img
            class="article-thumb"
            :src="articleThumb(article)"
            :alt="article.title"
          >
        </div>
        <div class="bx--col-sm-12 bx--col-md-5">
          <div class="pt-spacing-sm pb-spacing-md">
            <h5
              class="mb-spacing-2xs sidebar-title"
              @click.exact="readArticle(article)"
              @keydown.enter="readArticle(article)"
              v-text="$titleCase(article.title)"
            />
            <div
              v-if="article.abstract.length > 200"
              ref="abstract"
              class="abstract-content"
              v-html="article.abstract.slice(0, 200) + '...'"
            />
            <div
              v-else
              ref="abstract"
              class="abstract-content"
              v-html="article.abstract"
            />
            <cv-link :href="articleUrl(article)">
              Read More
            </cv-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="no-articles-msg">
        No Articles. Click here to view Regional News.
      </p>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { baseUrl } from '@/app/environment'

export default {
  name: 'sidebar-articles',
  computed: {
    ...mapState({
      loading: state => state.RiverNews.loading,
      error: state => state.RiverNews.error,
      articles: state => state.RiverNews.data
    })
  },
  watch: {
    articles () {
      this.$emit('articles:change')
    }
  },
  methods: {
    articleThumb (article) {
      if (article) {
        const uri = article.image.uri.thumb || article.image.uri.medium || article.image.uri.big
        return `${baseUrl}${uri}`
      }
      return null
    },
    articleUrl (article) {
      return `/content/Article/view/article_id/${article.id}/`
    }
  }
}
</script>
