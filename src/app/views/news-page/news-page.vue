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
                  `${baseUrl}resources/images/contents/${featured.contentsphoto}`
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
import { baseUrl } from '../../environment'

export default {
  name: 'news-page',
  components: {
    ArticleCard,
    FeatureCard,
    Layout,
    UtilityBlock
  },
  data: () => ({
    articleSearchTerm: null,
    baseUrl: baseUrl
  }),
  metaInfo () {
    return {
      title: 'News - American Whitewater'
    }
  },
  computed: {
    ...mapState({
      loading: state => state.NewsPage.loading,
      articles: state => state.NewsPage.frontPageNews,
      featured: state => state.NewsPage.featured
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
      this.$store.dispatch('NewsPage/searchArticles', this.articleSearchTerm)
    }
  },
  created () {
    if (!this.articles) {
      this.$store.dispatch('NewsPage/frontPageNews')
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
