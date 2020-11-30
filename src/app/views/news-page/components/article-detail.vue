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
    <template v-if="!loading && article">
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-lg-10 bx--offset-lg-3 bx--offset-max-3 bx--col-max-8 mb-lg"
          >
            <img
              :src="
                `${baseUrl}resources/images/contents/${article.contentsphoto}`
              "
              alt=""
              class="mb-spacing-lg"
            >

            <h1 class="mb-spacing-md">
              {{ this.$titleCase(article.title) }}
            </h1>
            <h6 class="mb-sm">
              {{ article.author }} - {{ formatDate(article.post_date, "ll") }}
            </h6>
            <hr class="mb-sm">
            <social-sharing
              :url="shareMeta.url"
              :title="shareMeta.title"
              :description="shareMeta.description"
              :quote="shareMeta.quote"
              :hashtags="shareMeta.hashtags"
              twitter-user="AmerWhitewater"
              inline-template
            >
              <div>
                <network
                  network="facebook"
                  class="mr-spacing-sm"
                >
                  <cv-button
                    size="small"
                    kind="tertiary"
                  >
                    Facebook
                  </cv-button>
                </network>
                <network
                  network="twitter"
                  class="mr-spacing-sm"
                >
                  <cv-button
                    size="small"
                    kind="tertiary"
                  >
                    Twitter
                  </cv-button>
                </network>
                <network
                  network="linkedin"
                  class="mr-spacing-sm"
                >
                  <cv-button
                    size="small"
                    kind="tertiary"
                  >
                    LinkedIn
                  </cv-button>
                </network>
                <network
                  network="email"
                  class="mr-spacing-sm"
                >
                  <cv-button
                    size="small"
                    kind="tertiary"
                  >
                    Email
                  </cv-button>
                </network>
              </div>
            </social-sharing>
            <div class="mb-sm" />
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
                v-for="(item, i) in relatedArticles"
                :key="i"
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
import { mapState } from 'vuex'
import Moment from 'moment'
import { baseUrl } from '../../../environment'

export default {
  name: 'article-detail',
  components: {
    ArticleCard
  },
  data: () => ({
    relatedArticles: null
  }),
  metaInfo () {
    return {
      title: this.getMetaTitle,
      titleTemplate: '%s | American Whitewater',
      baseUrl: baseUrl
    }
  },

  computed: {
    ...mapState({
      article: state => state.newsPageState.articleData.data,
      loading: state => state.newsPageState.articleData.loading,
      error: state => state.newsPageState.articleData.error,
      frontPageNews: state => state.newsPageState.newsData.frontPageNews,
      relatedLoading: state => state.newsPageState.newsData.loading,
      relatedError: state => state.newsPageState.newsData.error
    }),
    getMetaTitle () {
      if (this.article) {
        return this.article.title.length > 50
          ? this.article.title.slice(0, 47) + '...'
          : this.article.title
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
    },
    shareMeta () {
      if (this.article) {
        const description = this.formatShareDescription(this.article.abstract)
        const url = `https://wh2o-vue.herokuapp.com/#/article/${this.article.id}`
        const title = this.article.title
        /**
         * @temp until we can get quote + hashtag wired to db
         */
        const quote = description
        const hashtags = 'whitewater,river,conservation'
        return {
          title,
          url,
          description,
          quote,
          hashtags
        }
      }
      return null
    }
  },
  watch: {
    articleId (val) {
      if (val) {
        this.$store.dispatch('NewsPage/getArticleDetail', val)
      }
    },
    frontPageNews (val) {
      if (val) {
        this.randomRelatedArticles()
      }
    }
  },
  methods: {
    /**
     * @returns two random articles from loaded articles
     * used to add some variety to 'related news' sidebar
     */
    randomRelatedArticles () {
      if (this.frontPageNews && this.frontPageNews.length > 0) {
        const articles = []

        const randomNumber = () =>
          Math.floor(Math.random() * (this.frontPageNews.length - 1) + 1)
        const numberOfArticles = 2

        for (let i = 0; articles.length < numberOfArticles; i++) {
          const candidate = this.frontPageNews[randomNumber()]
          const prevAdded = articles.find(a => a.id === candidate.id)

          if (!prevAdded && candidate.id !== parseInt(this.articleId, 10)) {
            articles.push(candidate)
          }
        }
        this.relatedArticles = articles
      }
    },
    formatDate (date) {
      return Moment(date).format('ll')
    },
    /**
     * remove html from article abstract
     */
    formatShareDescription (abstract) {
      if (abstract) {
        const shareDescription = this.$sanitize(abstract, {
          allowedTags: [],
          allowedAttributes: {}
        })

        return shareDescription.slice(0, 150) + '...'
      }
      return 'Check this out on American Whitewater.'
    },
    randomNumber (index) {
      return Math.floor(Math.random() * (10000 + index))
    }
  },
  created () {
    this.$store.dispatch(
      'NewsPage/getArticleDetail',
      this.articleId
    )

    if (!this.frontPageNews) {
      this.$store.dispatch('NewsPage/frontPageNews')
    }
  },
  mounted () {
    if (this.frontPageNews) {
      this.randomRelatedArticles()
    }
  },
  beforeRouteLeave (to, from, next) {
    /**
     * @todo we can make this description meta data function part of vue router global nav guards
     */
    const defaultDescription =
      'American Whitewater is the primary advocate for the preservation and protection of whitewater rivers throughout the United States and connects the interests of human-powered recreational river users with ecological and science-based data to achieve goals within our mission.'
    document
      .getElementById('meta-description')
      .setAttribute('content', defaultDescription)
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

.article-wrapper {
  background-color: $ui-01;
  z-index: 2;
  position: relative;

  @include carbon--breakpoint("sm") {
    padding: $spacing-sm;
  }
  @include carbon--breakpoint("md") {
    padding: $spacing-md;
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
