<template>
  <div class="sidebar-alerts mb-spacing-md">
    <span class="header-row">
      <h4 class="mb-spacing-sm">Alerts</h4>
      <cv-button
        id="new-alert"
        kind="secondary"
        :disabled="loading"
        size="small"
        class="mb-spacing-sm"
        @click.exact="openModal"
        @keydown.enter="newAlertModalVisible = true"
      >New Alert</cv-button>
    </span>
    <template v-if="loading">
      <cv-inline-loading state="loading" />
    </template>
    <template v-else-if="alerts && alerts.length > 0">
      <cv-inline-notification
        v-for="(alert, index) in alerts.slice(0, 1)"
        :key="index"
        :title="alertTitle(alert)"
        :sub-title="alert.detail"
        action-label="See More"
        @action="$router.push(`/river-detail/${$route.params.id}/news`)"
      />
    </template>
    <template v-else>
      <p class="no-alerts-msg pb-spacing-md">
        There are no new alerts.
      </p>
    </template>
    <post-update-modal
      :visible="newAlertModalVisible"
      kind="WARNING"
      title="New Alert"
      :reach-id="$route.params.id"
      @update:submitted="newAlertModalVisible = false"
      @update:success="handleSuccess"
      @update:cancelled="newAlertModalVisible = false"
    >
      <template #form-fields="formData">
        <cv-text-input
          ref="title"
          v-model="formData.formData.post.title"
          class="mb-spacing-md"
          label="Title"
        />
        <cv-text-area
          v-model="formData.formData.post.detail"
          label="Message"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
    </post-update-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PostUpdateModal from '@/app/global/components/post-update-modal/post-update-modal'
export default {
  name: 'sidebar-alerts',
  components: {
    PostUpdateModal
  },
  data: () => ({
    newAlertModalVisible: false
  }),
  computed: {
    ...mapState({
      alerts: state => state.RiverAlerts.data,
      loading: state => state.RiverAlerts.loading,
      error: state => state.RiverAlerts.error,
      user: state => state.User.data,
    })
  },
  watch: {
    alerts () {
      this.$emit('alerts:change')
    }
  },
  methods: {
    openModal () {
      if (this.user) {
        this.newAlertModalVisible = true
      } else {
        this.$store.dispatch('Global/sendToast', {
          title: 'Must Log In',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
    },
    formatTitle (title, max) {
      if (title && title.length > max) {
        return this.$titleCase(title.slice(0, max) + '...')
      }
      return this.$titleCase(title)
    },
    alertTitle (alert) {
      let title = ''
      if (alert.post_date && alert.post_date.length > 0) {
        title += this.formatDate(alert.post_date, 'll')
      }
      if (alert.title && alert.title.length > 0) {
        title += ` - ${this.formatTitle(alert.title, 30)}`
      }

      return title
    },
    handleSuccess () {
      this.newAlertModalVisible = false
      this.$store.dispatch(
        'RiverAlerts/getProperty',
        this.$route.params.id
      )
      this.$store.dispatch('Global/sendToast', {
        title: 'Alert Submitted',
        kind: 'success'
      })
    }
  }
}
</script>
