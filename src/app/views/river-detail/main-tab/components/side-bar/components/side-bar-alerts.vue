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
      metric_id: '',
      post_date: '',
      reach_id: '',
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
    cancelNewAlert () {
      this.newAlertModalVisible = false
    },
    submitAlert () {
      this.newAlertModalVisible = false

      const today = new Date()

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
            postUpdate(id: $id, post:$post)  {
            id
            title
            detail
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
  }
}
</script>
<style lang="scss">
.sidebar-alerts {
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .no-alerts-msg {
     @include carbon--type-style("code-02");
  }
}
</style>
