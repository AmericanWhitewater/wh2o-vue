<template>
  <aside
    v-view.once="loadData"
    class="main-tab-sidebar"
  >
    <cv-tile
      ref="contentArea"
      :class="[{ sticky: sticky }, 'content-area bx--row']"
    >
      <div class="bx--col">
        <span class="header-row">
          <h4>Alerts</h4>
          <cv-button
            kind="secondary"
            size="small"
            @click.exact="newAlertModalVisible = true"
          >New Alert</cv-button>
        </span>
        <template v-if="!loading && alerts">
          <cv-inline-notification
            v-for="(alert, index) in alerts.slice(0, 2)"
            :key="index"
            :title="alert.title ? alert.title.slice(0, 35) : null"
            :sub-title="alert.detail.slice(0, 50) + '...'"
            action-label="Read More"
            @close="doClose(index)"
            @action="$router.push(`/river-detail/${$route.params.id}/news`)"
          />
          <template v-if="!alerts.length">
            <p class="pt-spacing-md pb-spacing-md">
              There are no new alerts.
            </p>
          </template>
        </template>

        <template v-if="loading">
          <div class="pt-spacing-md pb-spacing-md">
            <cv-inline-loading state="loading" />
          </div>
        </template>

        <h4 class="mb-spacing-sm">
          News
        </h4>
        <template v-if="articlesLoading">
          <div class="pt-spacing-md pb-spacing-md">
            <cv-inline-loading state="loading" />
          </div>
        </template>
        <template v-else-if="articles && articles.length > 0">
          <div
            v-for="(article, i) in articles.slice(0, 2)"
            :key="i + 3 * 4"
            class="bx--row mb-spacing-xs sidebar-article"
            @keydown.enter="$router.push(`/article/${article.id}`)"
            @click.exact="$router.push(`/article/${article.id}`)"
          >
            <div class="bx--col-sm-12 bx--col-md-3">
              <div
                class="article-thumb bx--aspect-ratio--1x1"
                :style="`background-image: url(https://americanwhitewater.org${
                  article.abstractimage.uri.medium ||
                  article.abstractimage.uri.thumb
                })`"
                :alt="article.title"
              />
            </div>
            <div class="bx--col-sm-12 bx--col-md-5">
              <div>
                <h5
                  class="mb-spacing-2xs"
                  v-text="$titleCase(article.title)"
                />
                <p v-html="article.abstract.slice(0, 50)" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          No articles
        </template>
      </div>
    </cv-tile>
    <cv-modal
      :visible="newAlertModalVisible"
      @modal-shown="$refs.title.$refs.input.focus()"
      @secondary-click="cancelNewAlert"
      @primary-click="submitAlert"
    >
      <template slot="title">
        Create Alert
      </template>
      <template slot="content">
        <cv-text-input
          ref="title"
          v-model="formData.title"
          class="mb-spacing-md"
          label="Title"
          :disabled="formPending"
        />
        <cv-dropdown
          v-if="gages"
          v-model="formData.gauge_id"
          class="mb-spacing-md"
          label="Gage"
        >
          <cv-dropdown-item
            v-for="(g, i) in gages"
            :key="i"
            :value="g.gauge.id"
          >
            {{ g.gauge.name }}
          </cv-dropdown-item>
        </cv-dropdown>
        <cv-text-input
          v-model="formData.reading"
          class="mb-spacing-md"
          label="Flow Level"
          :disabled="formPending"
        />
        <cv-text-area
          v-model="formData.detail"
          label="Message"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </aside>
</template>
<script>
import { mapState } from 'vuex'
import { alertsActions, newsTabActions } from '../../../shared/state'
import { globalAppActions } from '@/app/global/state'
import { httpClient } from '@/app/global/services'
export default {
  name: 'side-bar',
  data: () => ({
    formPending: false,
    formData: {
      detail: '',
      post_type: 'WARNING',
      gauge_id: '',
      metric_id: '',
      post_date: '',
      reach_id: '',
      reading: '',
      title: '',
      user_id: ''
    },
    newAlertModalVisible: false,
    sticky: false
  }),
  computed: {
    ...mapState({
      alerts: state => state.riverDetailState.alertsData.data,
      loading: state => state.riverDetailState.alertsData.loading,
      error: state => state.riverDetailState.alertsData.error,
      articlesLoading: state => state.riverDetailState.newsTabData.loading,
      articlesError: state => state.riverDetailState.newsTabData.error,
      articles: state => state.riverDetailState.newsTabData.data,
      gages: state => state.riverDetailState.reachGagesData.data,
      user: state => state.userState.userData.data
    }),
    reachId () {
      return this.$route.params.id
    }
  },
  watch: {
    alerts () {
      this.isSticky()
    },
    articles () {
      this.isSticky()
    }
  },
  methods: {
    doClose (index) {
      // eslint-disable-next-line no-console
      console.log('index :', index)
    },
    cancelNewAlert () {
      this.newAlertModalVisible = false
    },
    isSticky () {
      if (this.$refs.contentArea.clientHeight > 800) {
        this.sticky = false
      } else {
        this.sticky = true
      }
    },
    submitForm () {
      this.newAlertModalVisible = false
      this.$store.dispatch(alertsActions.CREATE_ALERT, this.formData)
    },

    submitAlert () {
      this.newAlertModalVisible = false

      const today = new Date()

      // We save the user input in case of an error
      const data = {
        id: this.$randomId,
        post: {
          user_id: this.user.uid,
          detail: this.formData.detail,
          post_date: today.toISOString(),
          post_type: 'WARNING',
          reach_id: this.reachId
        }
      }

      httpClient
        .post('/graphql', {
          query: `
          mutation ($id:ID!, $post: PostInput!) {
              post:postUpdate(id: $id, post:$post)  {
              id
        }
        }`,
          variables: data
        })
        .then(r => {
          if (!r.errors) {
            this.$store.dispatch(globalAppActions.SEND_TOAST, {
              title: 'Alert Submitted',
              kind: 'success',
              override: true,
              contrast: false,
              action: false,
              autoHide: true
            })
            this.$store.dispatch(
              alertsActions.FETCH_ALERTS_DATA,
              this.$route.params.id
            )
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log('e :', e)
        })
    },

    loadData () {
      if (!this.alerts) {
        this.$store.dispatch(
          alertsActions.FETCH_ALERTS_DATA,
          this.$route.params.id
        )
      }

      if (!this.articles) {
        this.$store.dispatch(
          newsTabActions.FETCH_NEWS_TAB_DATA,
          this.$route.params.id
        )
      }
    }
  },
  mounted () {
    if (this.gages) {
      this.formData.gauge_id = this.gages[0].gauge.id
      this.formData.reading = this.gages[0].gauge_reading.toString()
    }
  }
}
</script>
<style lang="scss">
.main-tab-sidebar {
  min-height: 100%;
  .content-area {
    height: auto;
    // background-color: $ui-03;
    padding: $spacing-sm 0;
    &.sticky {
      position: sticky;
      top: 50px;
      @include carbon--breakpoint("lg") {
        top: 75px;
      }
    }
  }
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.sidebar-article {
  &:hover {
    cursor: pointer;
    h5,
    p {
      text-decoration: underline;
    }
  }

  .article-thumb {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: $ui-03;
  }
}
</style>
