<template>
  <div class="news-page bg-topo">
    <layout
      name="layout-two-thirds"
      :options="{sidebar:{left:true}}"
    >
      <template #sidebar>
        <hr>
        <h1 class="mb-spacing-md">
          News
        </h1>
        <div class="sidebar sticky">
          <cv-search
            v-model="articleSearchTerm"
            class="mb-spacing-md"
            @keydown.enter="searchArticles"
          />
          <cv-dropdown
            label="Sort By"
            value="05"
            class="mb-spacing-md"
            @change="searchArticles"
          >
            <cv-dropdown-item value="10">
              Latest
            </cv-dropdown-item>
            <cv-dropdown-item value="20">
              Featured
            </cv-dropdown-item>
            <cv-dropdown-item value="30">
              Oldest
            </cv-dropdown-item>
            <cv-dropdown-item value="40">
              Popular
            </cv-dropdown-item>
            <cv-dropdown-item value="50">
              Bookmarked
            </cv-dropdown-item>
          </cv-dropdown>
          <cv-dropdown
            label="Content Type"
            value="05"
            @change="searchArticles"
          >
            <cv-dropdown-item value="10">
              Article
            </cv-dropdown-item>
            <cv-dropdown-item value="20">
              Project
            </cv-dropdown-item>
            <cv-dropdown-item value="30">
              Legislation
            </cv-dropdown-item>
            <cv-dropdown-item value="40">
              Video
            </cv-dropdown-item>
            <cv-dropdown-item value="50">
              Photo
            </cv-dropdown-item>
          </cv-dropdown>
        </div>
      </template>

      <template #main>
        <template v-if="!loading && articles.length > 0">
          <div class="bx--row">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="bx--col-md-4 bx--col-lg-8 mb-spacing-lg"
            >
              <ArticleCard
                :title="$titleCase(article.title.rendered)"
                :article-id="article.id"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <loading-block text="Loading articles..." />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { LoadingBlock, ArticleCard } from '@/app/global/components'
import { Layout } from '@/app/global/layout'
import { newsActions } from './shared/state'
export default {
  name: 'news-page',
  components: {
    LoadingBlock,
    ArticleCard,
    Layout
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
        disallowedTags: ['strong', 'em', 'b', 'bold'],
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
  .sidebar {
    background-color: $ui-01;
    @include layer("raised");
    padding: $spacing-md;
  }
}
</style>
