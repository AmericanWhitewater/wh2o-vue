<template>
  <aside
    v-view.once="loadData"
    class="main-tab-sidebar"
  >
    <div
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
            :title="alert.title"
            :sub-title="alert.detail.slice(0, 50) + '...'"
            action-label="Read More"
            @close="doClose(index)"
            @action="$router.push(`/river-detail/${$route.params.id}/news`)"
          />
          <template v-if="!alerts.length">
            <p>There are no new alerts</p>
          </template>
        </template>

        <template v-if="loading">
          <cv-inline-loading state="loading" />
        </template>
        <template v-if="articles.length > 0">
          <h4>News</h4>
        </template>
        <template v-if="documents.length > 0">
          <h4>Documents</h4>
        </template>
        <template v-if="projects.length > 0">
          <h4>Projects</h4>
        </template>
      </div>
    </div>
    <cv-modal
      :visible="newAlertModalVisible"
      @secondary-click="cancelNewAlert"
      @primary-click="submitForm"
    >
      <template slot="title">
        Create Alert
      </template>
      <template slot="content">
        <cv-text-input
          v-model="formData.title"
          class="mb-spacing-md"
          label="Title"
          placeholder="label"
          :disabled="formPending"
        />
        <cv-dropdown
          v-model="formData.gauge_id"
          class="mb-spacing-md"
          label="Gage"
        />
        <cv-text-input
          v-model="formData.reading"
          class="mb-spacing-md"
          label="Flow Level"
          placeholder="label"
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
import { alertsActions } from '../../../shared/state'
import { globalAppActions } from '@/app/global/state'
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
    sticky: false,
    articles: [],
    projects: [],
    documents: []
  }),
  computed: {
    ...mapState({
      alerts: state => state.riverDetailState.alertsData.data,
      loading: state => state.riverDetailState.alertsData.loading,
      error: state => state.riverDetailState.alertsData.error
    }),
    routeID () {
      return this.$route.params.id
    }
  },
  watch: {
    alerts () {
      this.isSticky()
    }
  },
  methods: {
    doClose (index) {
      alert(`Do something for alert: ${index}`)
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
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Alert Submitted',
        kind: 'success',
        override: true,
        contrast: false,
        action: false,
        autoHide: true
      })
    },
    loadData () {
      this.$store.dispatch(alertsActions.FETCH_ALERTS_DATA, this.routeID)
    }
  }
}
</script>
<style lang="scss">
.main-tab-sidebar {
  min-height: 100%;
  .content-area {
    height: auto;
    background-color: $ui-03;
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
</style>
