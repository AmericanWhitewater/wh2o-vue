<template>
  <div :class="[{ visible: visible }, 'alert-update-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      @modal-shown="setModalOffset"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
    >
      <template slot="title">
        {{ modalTitle }}
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
import { httpClient } from '@/app/global/services'
import { shadowDomFixedHeightOffset } from '@/app/global/mixins'

import { mapState } from 'vuex'
export default {
  name: 'alert-update-modal',
  mixins: [shadowDomFixedHeightOffset],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    alertId: {
      type: String,
      required: false
    }
  },
  data: () => ({
    formData: {
      id: this.$randomId(),
      post: {
        user_id: null,
        detail: null,
        post_date: null,
        post_type: 'WARNING',
        reach_id: null
      }
    }
  }),
  computed: {
    ...mapState({
      user: state => state.User.data,
      alerts: state => state.RiverAlerts.data
    }),
    activeAlert () {
      if (this.alertId) {
        return this.alerts.find(a => a.id === this.alertId)
      }
      return null
    }
  },
  methods: {
    setFormData () {
      const today = new Date()

      this.formData.post.post_date = today.toISOString()

      if (this.alertId) {
        this.formData.id = this.alertId
        this.formData.post.title = this.activeAlert.title
        this.formData.post.detail = this.activeAlert.detail
      }
    },
    handleCancel () {
      this.$emit('update:cancelled')
    },
    submitAlert () {
      if (this.user) {
        this.formData.post.user_id = this.user.uid

        this.$emit('update:submitted')

        httpClient
          .post('/graphql', {
            query: `
            mutation ($id:ID!, $post: PostInput!) {
                post:postUpdate(id: $id, post:$post)  {
                id
              }
            }`,
            variables: this.formData
          })
          .then(r => {
            this.formData.post.detail = ''
            this.formData.post.title = ''
            if (!r.errors) {
              this.$store.dispatch('Global/sendToast', {
                title: 'Alert Submitted',
                kind: 'success',
                override: true,
                contrast: false,
                action: false,
                autoHide: true
              })
              this.$store.dispatch(
                'RiverAlerts/getProperty',
                this.$route.params.id
              )
            }
          })
          .catch(e => {
            this.formData.detail = ''
            // eslint-disable-next-line no-console
            console.log('e :', e)
          })
      }
    }
  },
  mounted () {
    this.setFormData()
  }
}
</script>
