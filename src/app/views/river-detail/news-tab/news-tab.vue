<template>
  <section class="map-tab">
    <div class="alerts">
      <hr>
      <h2 class="mb-spacing-sm">
        Alerts
      </h2>
      <cv-button
        kind="secondary"
        size="small"
        class="mb-sm"
      >
        New Alert
      </cv-button>
      <div
        v-if="loading"
      >
        <loading-block text="loading alerts" />
      </div>
      <div
        v-else-if="alerts"
      >
        <div class="bx--row">
          <div
            v-for="(alert, index) in alerts"
            :key="index"
            class="alert-item bx--col-sm-12 bx--col-md-6 mb-sm bx--tile"
          >
            <h4 v-if="alert.title">
              {{ alert.title }}
            </h4>
            <p v-text="alert.detail" />
          </div>
        </div>
      </div>
      <div
        v-else
      >
        <error-block />
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { newsTabActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'

export default {
  name: 'news-tab',
  components: {
    ErrorBlock,
    LoadingBlock
  },
  data: () => ({
    mapHttpConfig: {
      lat: null,
      lon: null
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.newsTabData.loading,
      error: state => state.riverDetailState.newsTabData.error,
      alerts: state => state.riverDetailState.newsTabData.data
    })
  },
  methods: {
    loadData () {
      if (!this.alerts && !this.error) {
        this.$store.dispatch(newsTabActions.FETCH_NEWS_TAB_DATA, this.$route.params.id)
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
.map-tab {
  padding-top: 2rem;
}
</style>
