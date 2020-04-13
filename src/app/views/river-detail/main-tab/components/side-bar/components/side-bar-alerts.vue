<template>
  <div class="sidebar-alerts">
    <span class="header-row">
      <h4>Alerts</h4>
      <cv-button
        id="new-alert"
        kind="secondary"
        size="small"
        @click.exact="newAlertModalVisible = true"
        @keydown.enter="newAlertModalVisible = true"
      >New Alert</cv-button>
    </span>
    <template v-if="loading">
      <cv-inline-loading
        id="cv-inline-loading--alerts"
        state="loading"
      />
    </template>
    <template v-else-if="sortedAlerts">
      <template v-if="sortedAlerts.length > 0">
        <cv-inline-notification
          v-for="(alert, index) in sortedAlerts.slice(0, 2)"
          :key="index"
          :title="formatTitle(alert.title, 30)"
          :sub-title="formatTitle(alert.detail, 50)"
          action-label="Read More"
          @close="doClose(index)"
          @action="$router.push(`/river-detail/${$route.params.id}/news`)"
        />
      </template>
      <template v-if="sortedAlerts">
        <p class="pt-spacing-md pb-spacing-md">
          There are no new alerts.
        </p>
      </template>
    </template>
    <cv-modal
      id="new-alert-modal"
      :visible="newAlertModalVisible"
      @modal-shown="$refs.title.$refs.input.focus()"
      @secondary-click="cancelNewAlert"
      @modal-hidden="newAlertModalVisible = false"
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { httpClient } from '@/app/global/services'
import { alertsActions } from '@/app/views/river-detail/shared/state'
import { globalAppActions } from '@/app/global/state'
export default {
  name: 'sidebar-alerts',
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
    newAlertModalVisible: false
  }),
  computed: {
    ...mapState({
      alerts: state => state.riverDetailState.alertsData.data,
      loading: state => state.riverDetailState.alertsData.loading,
      error: state => state.riverDetailState.alertsData.error,
      gages: state => state.riverDetailState.reachGagesData.data,
      user: state => state.userState.userData.data
    }),
    sortedAlerts () {
      if (this.alerts && this.alerts.length > 0) {
        return this.alerts.sort((a, b) => (a.post_date < b.post_date ? 1 : -1))
      }
      return []
    }
  },
  watch: {
    alerts () {
      this.$emit('alerts:change')
    }
  },
  methods: {
    doClose (index) {
      // eslint-disable-next-line no-console
      console.log('index :', index)
    },
    formatTitle (title, max) {
      if (title && title.length > max) {
        return this.$titleCase(title.slice(0, max) + '...')
      }
      return this.$titleCase(title)
    },
    cancelNewAlert () {
      this.newAlertModalVisible = false
    },
    submitAlert () {
      this.newAlertModalVisible = false

      const today = new Date()

      // We save the user input in case of an error
      const data = {
        id: this.$randomId,
        post: {
          user_id: this.user.uid,
          title: this.formData.title,
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
    }
  },
  mounted () {
    if (this.gages && this.gages.length > 0) {
      this.formData.gauge_id = this.gages[0].gauge.id
      this.formData.reading = this.gages[0].gauge_reading.toString()
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-alerts {
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
<docs>

</docs>
