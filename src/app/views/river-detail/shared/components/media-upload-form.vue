<template>
  <div class="media-upload-form">
    <h2
      v-if="title"
      class="mb-spacing-md"
      v-text="title"
    />
    <cv-file-uploader
      ref="fileUploader"
      v-model="formData.fileinput.file"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="formPending"
    />
    <cv-text-input
      v-model="formData.photo.author"
      class="mb-spacing-md"
      label="Author"
      placeholder="label"
      required
      :disabled="formPending"
    />
    <cv-text-input
      v-model="formData.photo.subject"
      class="mb-spacing-md"
      label="Subject"
      placeholder="label"
      :disabled="formPending"
    />
    <cv-text-input
      v-model="formData.photo.caption"
      class="mb-spacing-md"
      label="Caption"
      placeholder="label"
      :disabled="formPending"
    />
    <cv-text-area
      v-model="formData.photo.description"
      label="label"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="formPending"
    />
    <cv-button
      v-if="!parentIsModal"
      :disabled="formPending"
      @click.exact="submitForm"
      @keydown.enter="submitForm"
    >
      Submit
    </cv-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalAppActions } from '@/app/global/state'
export default {
  name: 'media-upload-form',
  props: {
    section: {
      type: String,
      required: true,
      validator: val =>
        ['rapid', 'post', 'gallery', 'reach', 'section_id'].indexOf(val) > -1
    },
    primaryClickTimestamp: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false
    }
  },
  data: () => ({
    formPending: false,
    formData: {
      // camelCase it?
      fileinput: {
        file: null,
        // what are these?
        section: '',
        section_id: ''
      },
      photo: {
        author: '',
        caption: '',
        description: '',
        photo_date: '',
        poi_id: '',
        poi_name: '',
        post_id: '',
        subject: ''
      }
    }
  }),

  computed: {
    ...mapState({
      user: state => state.userState.userData.data,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    fieldsDisabled () {
      return !this.user || this.formPending
    },
    parentIsModal () {
      return !!this.$parent.$refs.modalDialog
    }
  },
  watch: {
    primaryClickTimestamp () {
      this.formSubmit()
    }
  },
  methods: {
    formSubmit () {
      alert('form submit')
      this.$emit('form:submitted')
      this.formPending = true
      // this.$store.state.dispatch(riverDetailActions.MEDIA_UPLOAD, this.formData)
      const successful = true
      setTimeout(() => {
        this.formPending = false
        if (successful) {
          this.$emit('form:success')
          this.$store.dispatch(globalAppActions.SEND_TOAST, {
            title: 'Upload Successful',
            kind: 'success',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        } else {
          this.$emit('form:error')
        }
      }, 3000)
    }
  },
  created () {
    if (this.user && this.user.uname) {
      this.formData.photo.author = this.user.uname
    }
  }
}
</script>
<style lang="scss" scoped>
.media-upload-form {
  .bx--modal .bx--text-input {
    background-color: #f4f7fb;
  }
}
</style>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
