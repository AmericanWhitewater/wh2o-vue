<template>
  <div class="news-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <hr>
        <h2 class="mb-spacing-md">
          Alerts
        </h2>

        <template v-if="alertsLoading">
          <utility-block
            class="alerts-loading"
            state="loading"
            text="loading alerts"
          />
        </template>
        <template v-else-if="alerts">
          <div class="bx--row">
            <div
              v-for="(alert, index) in alerts"
              :key="index"
              class="bx--col-sm-12 bx--col-lg-8 mb-spacing-md"
            >
              <cv-tile>
                <h3
                  v-if="alert.title"
                  class="mb-spacing-2xs"
                  v-text="alert.title"
                />
                <h3
                  v-else
                  class="mb-spacing-2xs"
                >
                  Untitled
                </h3>

                <h6>
                  {{ formatDate(alert.post_date,'ll') }}

                  <template v-if="alert.user">
                    - {{ alert.user.uname }}
                  </template>
                </h6>
                <hr>

                <p
                  v-if="alert.detail"
                  v-text="alert.detail"
                />
              </cv-tile>
            </div>
          </div>
        </template>
        <template v-else>
          <utility-block
            class="alerts-error"
            state="error"
            text="loading alerts failed"
          />
        </template>
      </template>

      <template #sidebar>
        form
      </template>
    </layout>

    <layout
      name="layout-full-width"
    >
      <template #main>
        <section class="map-tab">
          <div class="articles">
            <hr>
            <h2 class="mb-spacing-sm">
              Articles
            </h2>
            <div
              v-if="articlesLoading"
            >
              <utility-block
                class="articles-loading"
                state="loading"
                text="loading articles"
              />
            </div>
            <div
              v-else-if="articles"
            >
              <div class="bx--row">
                <div
                  v-for="(article, index) in articles"
                  :key="index"
                  class="bx--col-sm-12 bx--col-md-4 bx--col-lg-8 bx--col-max-4 mb-spacing-lg"
                >
                  <ArticleCard
                    :title="$titleCase(article.title)"
                    :article-class="article.id"
                    :author="article.author"
                    :read-time="estReadingTime(article.contents)"
                  />
                </div>
              </div>
            </div>
            <div
              v-else
            >
              <utility-block
                class="articles-error"
                state="error"
                text="loading news failed"
              />
            </div>
          </div>
        </section>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { newsTabActions, alertsActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { Layout } from '@/app/global/layout'
import { ArticleCard } from '@/app/global/components'
export default {
  name: 'news-tab',
  components: {
    UtilityBlock,
    Layout,
    ArticleCard
  },
  data: () => ({
    mapHttpConfig: {
      lat: null,
      lon: null
    }
  }),
  computed: {
    ...mapState({
      articlesLoading: state => state.riverDetailState.newsTabData.loading,
      articlesError: state => state.riverDetailState.newsTabData.error,
      articles: state => state.riverDetailState.newsTabData.data,
      alertsLoading: state => state.riverDetailState.alertsData.loading,
      alertsError: state => state.riverDetailState.alertsData.error,
      alerts: state => state.riverDetailState.alertsData.data
    })
  },
  methods: {
    loadData () {
      if (!this.articles && !this.articlesError) {
        this.$store.dispatch(newsTabActions.FETCH_NEWS_TAB_DATA, this.$route.params.id)
      }
      if (!this.alerts && !this.alertsError) {
        this.$store.dispatch(alertsActions.FETCH_ALERTS_DATA, this.$route.params.id)
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
.news-tab {
  padding-top: 2rem;
}
</style>
