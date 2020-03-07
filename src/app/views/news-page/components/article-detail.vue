<template>
  <div class="article-detail">
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
        <page-header
          :title="article.title.rendered"
          :subtitle="formatDate(article.date)"
          :featured-img="featuredMedia"
        />
        <div class="spacer" />
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-1 bx--col-lg-1 pt-md">
            <div class="share-article">
              <h5>Share</h5>
              <span @click="shareArticle('facebook')">
                <LogoFacebook24 />
              </span>
              <span @click="shareArticle('linkedin')">
                <LogoLinkedIn24 />
              </span>
              <span @click="shareArticle('email')">
                <Email24 />
              </span>
            </div>
          </div>
          <div class="bx--col-md-6 bx--col-lg-8 pt-md mb-lg">
            <div
              class="article-content"
              v-html="article.content.rendered"
            />
          </div>
          <div class="bx--col-lg-5 bx--offset-lg-1 pt-md mb-lg">
            <template v-if="article.categories.length > 0">
              <hr>
              <h2 class="mb-spacing-md">
                Categories
              </h2>
              <template v-for="(cat, index) in article.categories">
                <span
                  :key="randomNumber(index)"
                  class="mb-spacing-sm mr-spacing-sm"
                >{{ cat }}</span>
              </template>
              <div class="mb-md" />
            </template>

            <template v-if="article.tags.length > 0">
              <hr>
              <h2 class="mb-spacing-md">
                Tags
              </h2>
              <template v-for="(tag, k) in article.tags">
                <span
                  :key="randomNumber(k)"
                  class="mb-spacing-sm mr-spacing-sm"
                >{{ tag }}</span>
              </template>
              <div class="mb-md" />
            </template>
            <hr>
            <h2 class="mb-spacing-md">
              Related
            </h2>

            <span v-if="relatedLoading">Loading...</span>
            <span v-if="relatedLoading">Loading...</span>
            <template v-for="(item, i) in relatedArticles.slice(0,2)">
              <ArticleCard
                :key="randomNumber(i)"
                :title="item.title.rendered"
                :article-id="item.id"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { PageHeader, ArticleCard } from '@/app/global/components'
import { articleActions, newsActions } from '../shared/state'
import { mapState } from 'vuex'
import Moment from 'moment'
export default {
  name: 'ArticleDetail',
  components: {
    PageHeader,
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
      relatedArticles: state => state.newsPageState.newsData.data,
      relatedLoading: state => state.newsPageState.newsData.loading,
      relatedError: state => state.newsPageState.newsData.error
    }),
    getMetaTitle () {
      if (this.article) {
        if (this.article.title.rendered.length > 50) {
          return this.article.title.rendered.slice(0, 47) + '...'
        }

        return this.article.title.rendered
      }
      return null
    },
    articleId () {
      return this.$route.params.id
    },
    formatContent () {
      if (this.article) {
        const content = this.article.content.rendered
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
        this.$store.dispatch(
          articleActions.GET_FEATURED_MEDIA,
          this.article.featured_media
        )

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
      this.$store.dispatch(newsActions.GET_NEWS_ARTICLES)
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.article-content {
  @include carbon--type-style("body-long-02");
  p {
    margin-bottom: 1.25rem;
  }
}
</style>
