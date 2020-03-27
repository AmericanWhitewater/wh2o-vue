<template>
  <div class="news-page bg-topo">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" />
        </template>
        <template v-else-if="articles && featured">
          <div class="bx--row mb-md">
            <div class="bx--col">
              <hr>
              <h1 class="mb-spacing-sm">
                News
              </h1>
              <feature-card
                :img="
                  `https://americanwhitewater.org/resources/images/contents/${featured.contentsphoto}`
                "
                :to="`/article/${featured.id}`"
                :title="featured.title"
                subtitle="Latest"
              />
            </div>
          </div>
          <div class="bx--row">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="bx--col-md-4 bx--col-lg-8 bx--col-max-4 mb-spacing-lg"
            >
              <ArticleCard
                :title="$titleCase(article.title)"
                :article-id="article.id"
                :author="article.author"
                :read-time="estReadingTime(article.contents)"
              />
            </div>
          </div>
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  ArticleCard,
  FeatureCard,
  UtilityBlock
} from '@/app/global/components'
import { Layout } from '@/app/global/layout'
import { newsActions } from './shared/state'
export default {
  name: 'news-page',
  components: {
    ArticleCard,
    FeatureCard,
    Layout,
    UtilityBlock
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
      articles: state => state.newsPageState.newsData.frontPageNews,
      featured: state => state.newsPageState.newsData.featured
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
      this.$store.dispatch(newsActions.FRONT_PAGE_NEWS)
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
