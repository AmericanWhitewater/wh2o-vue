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
        class="bx--row mb-spacing-xs bx--tile--clickable"
      >
        <a :href="article.link" target="_blank">
          <div v-if="article.featured_image_src_square" class="bx--col-sm-12 bx--col-md-2">
            <img
              class="article-thumb"
              :src="article.featured_image_src_square"
              :alt="article.title"
            >
          </div>
          <div class="bx--col-sm-12 bx--col-md-6">
            <div class="pt-spacing-sm pb-spacing-md">
              <h5
                class="mb-spacing-2xs sidebar-title"
                v-text="$titleCase(article.title.rendered)"
              />
              <div
                ref="abstract"
                class="abstract-content"
              >
                <div class="read-more-container">
                  <span v-html="article.excerpt.rendered"/>
                </div>
              </div>
            </div>
          </div>
        </a>
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
      loading: state => state.RiverArticles.loading,
      error: state => state.RiverArticles.error,
      articles: state => state.RiverArticles.data
    })
  },
  watch: {
    articles () {
      this.$emit('articles:change')
    }
  },
}
</script>
