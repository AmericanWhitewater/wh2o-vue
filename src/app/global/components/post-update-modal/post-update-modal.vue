<template>
  <div class="post-update-modal">
    <cv-modal
      :visible="visible"
      :size="size"
      @secondary-click="handleCancel"
      @primary-click="handleSubmit"
      @modal-hidden="handleCancel"
    >
      <template
        v-if="label"
        slot="label"
      >
        {{ label }}
      </template>
      <template slot="title">
        {{ title }}
      </template>
      <template slot="content">
        <slot
          name="form-fields"
          :formData="formData"
        >
          <p>No fields added</p>
        </slot>
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
export default {
  name: 'post-update-modal',
  props: {
    label: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    reachId: {
      type: String,
      required: false
    },
    postId: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false,
      default: 'default',
      validator: val => ['xs', 'small', 'default', 'large'].indexOf(val) > -1
    },
    visible: {
      type: Boolean,
      required: true
    },
    kind: {
      type: String,
      required: true,
      validator: val => [
        'JOURNAL',
        'COMMENT',
        'WARNING',
        'PHOTO_POST',
        'GAUGE_OBSERVATION',
        'CHECKIN',
        'COMPLAINT',
        'EDITOR_COMMENT'
      ].indexOf(val) > -1
    }
  },
  data: () => ({
    formData: {
      id: null,
      post: {
        detail: null,
        gauge_id: null,
        metric_id: null,
        post_date: null,
        post_type: null,
        reach_id: null,
        reading: null,
        title: null,
        user_id: null
      }
    }
  }),
  computed: {
    userId () {
      return this.$store.state.userState.userData.data ? this.$store.state.userState.userData.data.uid : null
    }
  },
  methods: {
    setInitialFormData () {
      const today = new Date()

      this.formData.post.post_date = today.toISOString()
      this.formData.post.post_type = this.kind
      this.formData.post.user_id = this.userId

      if (this.reachId) {
        this.formData.post.reach_id = this.reachId
      }

      if (this.postId) {
        this.formData.id = this.postId
      } else {
        this.formData.id = this.$randomId
      }
    },
    handleCancel () {
      this.$emit('update:cancelled')
    },
    handleSubmit () {
      this.$emit('update:submitted')

      httpClient
        .post('/graphql', {
          query: `
              mutation ($id:ID!, $post: PostInput!) {
                  postUpdate(id: $id, post:$post)  {
                  id
                }
              }`,
          variables: this.formData
        })
        .then(r => {
          this.formData.pending = false
          if (!r.errors) {
            this.$emit('update:success')
          } else {
            this.$emit('update:error', r.errors)
          }
        })
        .catch(e => {
          this.formData.pending = false
          this.$emit('update:error', e)
        })
    }
  },
  mounted () {
    this.setInitialFormData()
  }
}
</script>
