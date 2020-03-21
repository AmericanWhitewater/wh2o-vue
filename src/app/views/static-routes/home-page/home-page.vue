<template>
  <div>
    <feature-card-hero />
    <div class="mb-lg" />
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <hr>
        <h1 class="mb-spacing-md">
          Recent News
        </h1>
        <cv-button
          class="mb-spacing-md"
          size="small"
          kind="tertiary"
          @click.exact="$router.push('/news')"
          v-text="'See all articles'"
        />
        <div class="bx--row">
          <loading-block v-if="loading" />
          <error-block v-if="!loading && error" />

          <template v-if="!loading && articles">
            <div
              v-for="(item, i) in articles.slice(0, 4)"
              :key="i"
              class="bx--col-md-4 bx--col-lg-6 bx--col-max-4  mb-spacing-lg"
            >
              <ArticleCard
                :author="item.author.toString()"
                :article-id="item.id"
                :title="item.title"
                :read-time="estReadingTime(item.contents)"
                action-icon="arrowRight"
              />
            </div>
          </template>
        </div>
      </template>
    </layout>
  </div>
</template>
<script>
import { FeatureCardHero } from './components'
import { Layout } from '@/app/global/layout'
import { LoadingBlock, ErrorBlock, ArticleCard } from '@/app/global/components'
import { newsActions } from '@/app/views/news-page/shared/state'
import { mapState } from 'vuex'

export default {
  name: 'home-page',
  components: {
    FeatureCardHero,
    Layout,
    LoadingBlock,
    ErrorBlock,
    ArticleCard
  },
  computed: {
    ...mapState({
      loading: state => state.newsPageState.newsData.loading,
      error: state => state.newsPageState.newsData.error,
      articles: state => state.newsPageState.newsData.frontPageNews
    })
  },
  methods: {
    estReadingTime (content) {
      if (content) {
        const wordsPerMinute = 200 // Average case.
        let result

        const textLength = content.split(' ').length // Split by words
        if (textLength > 0) {
          const value = Math.ceil(textLength / wordsPerMinute)
          result = `${value} min read`
          return result
        }
      }
      return ''
    }
  },
  mounted () {
    if (!this.articles) {
      this.$store.dispatch(newsActions.FRONT_PAGE_NEWS)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
