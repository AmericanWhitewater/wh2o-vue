<template>
  <div :class="[{'is-visible':visible},'post-update-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      :size="size"
      @modal-shown="setModalOffset"
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
        <template v-if="formPending">
          <cv-inline-loading state="loading" />
        </template>
        <template v-else>
          <slot
            name="form-fields"
            :formData="formData"
          >
            <p>No fields added</p>
          </slot>
        </template>
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
import { postUpdate } from './services/postUpdate'
import { shadowDomFixedHeightOffset } from '@/app/global/mixins'
export default {
  name: 'post-update-modal',
  mixins: [shadowDomFixedHeightOffset],
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
    post: {
      type: Object,
      required: false,
      default: () => ({})
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
    formPending: false,
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
      return this.$store.state.userState.userData.data?.uid
    }
  },
  watch: {
    post () {
      this.setInitialFormData()
    }
  },
  methods: {
    /**
     * @description if user is editing a post set the form
     * data to the exising post's data else user is creating
     * a new post and fields are blank.
     */
    setInitialFormData () {
      if (this.reachId) {
        this.formData.post.reach_id = this.reachId
      }

      if (this.post && Object.keys(this.post).length !== 0) {
        /**
         * map through post?
         */
        this.formData.id = this.post.id
        this.formData.post.title = this.post.title
        this.formData.post.detail = this.post.detail
        this.formData.post.post_type = this.post.post_type
        this.formData.post.post_date = this.post.post_date
        this.formData.post.user_id = this.post.user?.uid
      } else {
        this.formData.id = this.$randomId()
        const today = new Date()

        this.formData.post.post_date = today.toISOString()
        this.formData.post.post_type = this.kind
        this.formData.post.user_id = this.userId
      }
    },
    /**
       * @description clears the form after post is
       * successfully submitted
       */
    resetForm () {
      const initialFormData = {
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

      this.formData = Object.assign(this.formData, initialFormData)
    },
    handleCancel () {
      this.$emit('update:cancelled', true)
      this.resetForm()
    },
    async handleSubmit () {
      this.formPending = true
      this.$emit('update:pending', true)

      try {
        const result = await postUpdate(this.formData)
        if (result.data) {
          this.$emit('update:success', result.data.postUpdate.id)
          this.resetForm()
        } else {
          this.$emit('update:error', result.errors)
        }
      } catch (error) {
        this.$emit('update:error', error)
      } finally {
        this.formPending = false
        this.$emit('update:pending', false)
      }
    }
  },
  mounted () {
    this.setInitialFormData()
  }
}
</script>
