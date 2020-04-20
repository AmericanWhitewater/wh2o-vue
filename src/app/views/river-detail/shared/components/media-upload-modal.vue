<template>
  <cv-modal
    size="small"
    :visible="visible"
    @primary-click="primaryClick"
    @secondary-click="$emit('secondary-click')"
    @modal-shown="$emit('modal-shown')"
    @modal-hidden="$emit('modal-hidden')"
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
import MediaUploadForm from './media-upload-form.vue'
export default {
  name: 'media-upload-modal',
  components: {
    MediaUploadForm
  },
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
    }
  },
  data: () => ({
    primaryClickTimestamp: null
  }),
  methods: {
    primaryClick () {
      this.$emit('primary-click', Date.now())
      this.primaryClickTimestamp = Date.now()
    }
  }
}
</script>
