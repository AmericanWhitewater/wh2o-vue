<template>
  <cv-modal
    ref="modalWrapper"
    size="small"
    :visible="visible"
    @primary-click="handleSubmit"
    @secondary-click="handleCancel"
    @modal-shown="handleShow"
    @modal-hidden="handleCancel"
  >
    <template slot="label">
      <template v-if="label">
        {{ label }}
      </template>
    </template>
    <template slot="title">
      {{ title }}
    </template>
    <template slot="content">
      <media-upload-form
        :section="section"
        :primary-click-timestamp="primaryClickTimestamp"
        @form:success="$emit('form:success')"
        @form:submitted="$emit('form:submitted')"
        @form:error="$emit('form:error')"
      />
    </template>
    <template slot="secondary-button">
      Cancel
    </template>
    <template slot="primary-button">
      OK
    </template>
  </cv-modal>
</template>
<script>
/**
 *
 * @note could potentially merge media-upload-form into
 * this component if we're not using the form outside
 * of modal
 *
 */
import MediaUploadForm from './media-upload-form.vue'
import { shadowDomFixedHeightOffset } from '@/app/global/mixins'

export default {
  name: 'media-upload-modal',
  components: {
    MediaUploadForm
  },
  mixins: [shadowDomFixedHeightOffset],
  props: {
    title: {
      type: String,
      required: false,
      default: 'Media Upload'
    },
    label: {
      type: String,
      required: false
    },
    visible: {
      type: Boolean,
      required: true
    },
    section: {
      type: String,
      required: true,
      validator: val =>
        ['RAPID', 'POST', 'GALLERY', 'REACH'].indexOf(val) > -1
    },
    rapids: {
      type: Array,
      required: false,
      default: () => null
    }
  },
  data: () => ({
    primaryClickTimestamp: null
  }),
  methods: {
    handleShow () {
      this.$emit('modal-shown')
      this.setModalOffset()
    },
    handleSubmit () {
      this.$emit('upload:submitted')
      /**
       * child component has watcher on primaryClickTimestamp, when
       * changes, submits form.
       */
      this.primaryClickTimestamp = Date.now()
    },
    handleCancel () {
      this.$emit('upload:cancelled')
    }
  }
}
</script>
