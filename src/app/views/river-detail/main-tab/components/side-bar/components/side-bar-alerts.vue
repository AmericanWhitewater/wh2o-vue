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
        v-for="(alert, index) in alerts.slice(0, 2)"
        :key="index"
        :title="formatTitle(alert.title, 30)"
        :sub-title="formatTitle(alert.detail, 50)"
        action-label="Read More"
        @close="doClose(index)"
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
import { alertsActions } from '@/app/views/river-detail/shared/state'
import { globalAppActions } from '@/app/global/state'
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
      alerts: state => state.riverDetailState.alertsData.data,
      loading: state => state.riverDetailState.alertsData.loading,
      error: state => state.riverDetailState.alertsData.error,
      user: state => state.userState.userData.data
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
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Must Log In',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
    },
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
    handleSuccess () {
      this.newAlertModalVisible = false
      this.$store.dispatch(
        alertsActions.FETCH_ALERTS_DATA,
        this.$route.params.id
      )
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Alert Submitted',
        kind: 'success'
      })
    }
  }
}
</script>
