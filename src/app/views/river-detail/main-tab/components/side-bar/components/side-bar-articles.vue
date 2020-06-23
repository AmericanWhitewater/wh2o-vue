<template>
  <div class="sidebar-articles">
    <h4 class="mb-spacing-sm">
      News
    </h4>
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
        v-for="(article, i) in articles.slice(0, 2)"
        :key="i + 3 * 4"
        class="bx--row mb-spacing-xs sidebar-article"
        @keydown.enter="$router.push(`/article/${article.id}`)"
        @click.exact="$router.push(`/article/${article.id}`)"
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
              class="mb-spacing-2xs"
              v-text="$titleCase(article.title)"
            />
            <p v-html="article.abstract.slice(0, 50)" />
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
export default {
  name: 'sidebar-articles',
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.newsTabData.loading,
      error: state => state.riverDetailState.newsTabData.error,
      articles: state => state.riverDetailState.newsTabData.data
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
        return `https://americanwhitewater.org${uri}`
      }
      return null
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-articles {
  .sidebar-article {
    &:hover {
      cursor: pointer;
      h5,
      p {
        text-decoration: underline;
      }
    }

    .article-thumb {
      object-fit: cover;
      height: 100%;
      width:100%;
    }
  }
  .no-articles-msg {
    @include carbon--type-style("code-02");
  }
}
</style>
<docs>

</docs>
