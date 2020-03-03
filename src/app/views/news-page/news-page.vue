<template>
  <div class="news-page bx--grid">
    <page-header title="News" />
    <div class="bx--row mb-lg mt-lg">
      <div class="bx--col-sm-4 bx--offset-sm-4 bx--col-md-8 bx--col-md-4 bx--col-lg-8 bx--offset-lg-4">
        <cv-search
          v-model="articleSearchTerm"
          @keydown.enter="searchArticles"
        />
      </div>
    </div>

    <div class="bx--row">
      <template v-if="!loading && articles.length > 0">
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="bx--col-md-4 bx--col-lg-6 bx--col-max-4  mb-spacing-lg"
        >
          <ArticleCard
            :title="article.title.rendered"
            :article-id="article.id"
          />
        </div>
      </template>
      <template v-else>
        <loading-block text="Loading articles..." />
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { PageHeader, LoadingBlock, ArticleCard } from '@/app/global/components'
import { newsActions } from './shared/state'
export default {
  name: 'NewsPage',
  components: {
    PageHeader,
    LoadingBlock,
    ArticleCard
  },
  data: () => ({
    articleSearchTerm: null
  }),
  metaInfo () {
    return {
      title: 'News - American Whitewater'
    }
  },
  computed: {
    ...mapState({
      loading: state => state.newsPageState.newsData.loading,
      articles: state => state.newsPageState.newsData.data
    })
  },
  methods: {
    cleanCopy (copy) {
      return this.$sanitize(copy, {
        disallowedTags: [
          'strong', 'em', 'b', 'bold'
        ],
        disallowedAttributes: {
          '*': ['style', 'class']
        }
      })
    },
    searchArticles () {
      this.$store.dispatch(newsActions.SEARCH_ARTICLES, this.articleSearchTerm)
    }
  },
  created () {
    if (!this.articles) {
      this.$store.dispatch(newsActions.GET_NEWS_ARTICLES)
    }
  }
}
</script>
<style lang="scss">
.news-page {
  padding-bottom: $layout-lg;
  .spacer {
    margin-bottom: $layout-sm;
  }
  .news-tile {
    padding: 0;
    @include ease;
    &:hover {
      @include layer("raised");
    }
    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
    }
    .content-area {
      padding: $spacing-sm;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
