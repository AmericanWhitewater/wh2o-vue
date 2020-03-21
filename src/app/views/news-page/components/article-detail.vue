<template>
  <div class="article-detail bg-topo">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading
          active
          small
          overlay
        />
      </template>
    </transition>
    <template v-if="!loading">
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-lg-10 bx--offset-lg-3 bx--offset-max-3 bx--col-max-8 mb-lg"
          >
            <img
              :src="
                `https://americanwhitewater.org/resources/images/contents/${article.contentsphoto}`
              "
              alt=""
              class="mb-spacing-lg"
            >

            <h1 class="mb-spacing-md">
              {{ this.$titleCase(article.title) }}
            </h1>
            <h6 class="mb-spacing-md">
              {{ article.author }} - {{ formatDate(article.post_date, "ll") }}
            </h6>
            <hr class="mb-spacing-md">
            <!-- <cv-button size="small" kind="tertiary" class="mr-spacing-sm"
              >Facebook</cv-button
            >
            <cv-button size="small" kind="tertiary" class="mr-spacing-sm"
              >Twitter</cv-button
            >
            <cv-button size="small" kind="tertiary" class="mr-spacing-sm"
              >LinkedIn</cv-button
            > -->
            <div class="article-wrapper">
              <div
                class="article-content"
                v-html="article.contents"
              />
            </div>
          </div>

          <div
            class="bx--col-lg-6 bx--offset-lg-3 bx--col-max-4 bx--offset-max-1 pt-md mb-lg"
          >
            <div
              v-if="relatedArticles"
              class="sticky related-wrapper"
            >
              <ArticleCard
                v-for="(item, i) in relatedArticles.slice(0, 2)"
                :key="randomNumber(i)"
                :title="item.title"
                :article-id="item.id"
                :author="item.author.toString()"
                :read-time="estReadingTime(item.contents)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { ArticleCard } from '@/app/global/components'
import { articleActions, newsActions } from '../shared/state'
import { mapState } from 'vuex'
import Moment from 'moment'
export default {
  name: 'article-detail',
  components: {
    ArticleCard
  },
  data: () => ({
    sharePlatform: null,
    title: null,
    description: null
  }),
  metaInfo () {
    return {
      title: this.getMetaTitle,
      titleTemplate: '%s | American Whitewater'
    }
  },

  computed: {
    ...mapState({
      article: state => state.newsPageState.articleData.data,
      loading: state => state.newsPageState.articleData.loading,
      error: state => state.newsPageState.articleData.error,
      featuredMedia: state => state.newsPageState.articleData.featuredMedia,
      relatedArticles: state => state.newsPageState.newsData.frontPageNews,
      relatedLoading: state => state.newsPageState.newsData.loading,
      relatedError: state => state.newsPageState.newsData.error
    }),
    getMetaTitle () {
      if (this.article) {
        if (this.article.title.length > 50) {
          return this.article.title.slice(0, 47) + '...'
        }

        return this.article.title
      }
      return null
    },
    articleId () {
      return this.$route.params.id
    },
    formatContent () {
      if (this.article) {
        const content = this.article.contents
        const openingTags = this.$replaceText(content, '<div>', '<p>')
        const closingTags = this.$replaceText(openingTags, '</div>', '</p>')
        return closingTags
      }
      return null
    }
  },
  watch: {
    articleId (val) {
      this.$store.dispatch(articleActions.GET_ARTICAL_DETAIL_DATA, val)
    },
    article (data) {
      if (data) {
        // this.$store.dispatch(
        //   articleActions.GET_FEATURED_MEDIA,
        //   this.article.featured_media
        // );
        const content = this.$sanitize(data.abstract, {
          allowedTags: [],
          allowedAttributes: {}
        })
        document
          .getElementById('meta-description')
          .setAttribute('content', content.slice(0, 150))
      }
    }
  },
  methods: {
    shareArticle (platform) {
      this.sharePlatform = platform
    },
    formatDate (date) {
      return Moment(date).format('ll')
    },
    randomNumber (index) {
      return Math.floor(Math.random() * (10000 + index))
    }
  },
  created () {
    this.$store.dispatch(
      articleActions.GET_ARTICAL_DETAIL_DATA,
      this.articleId
    )

    if (!this.relatedArticles) {
      this.$store.dispatch(newsActions.FRONT_PAGE_NEWS)
    }
  },
  beforeRouteLeave (to, from, next) {
    /**
     * @todo we can make this description meta data function part of vue router global nav guards
     */
    document
      .getElementById('meta-description')
      .setAttribute('content', 'default description')
    next()
  }
}
</script>
<style lang="scss">
.article-detail {
  .spacer {
    margin-bottom: $layout-sm;
  }
  .breadcrumb-container {
    padding: $spacing-sm 0;
  }
  .share-article {
    display: flex;
    flex-flow: column nowrap;
    position: sticky;
    top: 100px;
    h5,
    span {
      margin-bottom: $spacing-sm;
    }
    span {
      cursor: pointer;
    }
  }
  h1 {
    @include carbon--breakpoint("sm") {
      @include carbon--type-style("productive-heading-04");
    }
    @include carbon--breakpoint("md") {
      @include carbon--type-style("productive-heading-05");
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.article-wrapper {
  background-color: $ui-01;
  z-index: 2;
  position: relative;

  @include carbon--breakpoint("sm") {
    padding: $spacing-sm;
  }
}

.article-content {
  @include carbon--type-style("body-long-02");
  p {
    margin-bottom: 1.25rem;
  }
}

.featured-image-wrapper {
  position: relative;
  .featured-image {
    position: absolute;
    z-index: 1;
  }
}
</style>
