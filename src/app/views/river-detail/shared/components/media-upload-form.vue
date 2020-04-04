<template>
  <div class="media-upload-form">
    <h2
      v-if="title"
      class="mb-spacing-md"
      v-text="title"
    />
    <cv-file-uploader
      ref="fileUploader"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="formPending"
      @change="setFile"
    />
    <cv-text-input
      v-model="formData.photo.author"
      class="mb-spacing-md"
      label="Author"
      required
      :disabled="formPending"
    />
    <cv-text-input
      v-model="formData.photo.subject"
      class="mb-spacing-md"
      label="Subject"
      :disabled="formPending"
    />
    <cv-text-input
      v-model="formData.photo.caption"
      class="mb-spacing-md"
      label="Caption"
      :disabled="formPending"
    />
    <cv-text-area
      v-model="formData.photo.description"
      label="Description"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="formPending"
    />
    <cv-button
      v-if="!parentIsModal"
      :disabled="formPending"
      @click.exact="sendFile"
      @keydown.enter="sendFile"
    >
      Submit
    </cv-button>
  </div>
</template>
<script>
import gql from 'graphql-tag'
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
    },
    rapids: {
      type: Array,
      required: false,
      default: () => null
    }
  },
  data: () => ({
    formPending: false,
    formData: {
      fileinput: {
        file: null,
        section: '',
        section_id: ''
      },
      photo: {
        author: '',
        caption: '',
        description: '',
        photo_date: '',
        poi_id: 0,
        poi_name: '',
        post_id: '',
        subject: ''
      }
    }
  }),

  computed: {
    user () {
      return this.$store.state.userState.userData.data
    },
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
    setFile (input) {
      this.formData.fileinput.file = input[0].file
    },
    /**
     * @todo clear form after file upload started but make copy incase error
     * @note how is upload getting linked to user and to reach? Shouldnt those be
     * added to the create call?
     *
     */
    sendFile () {
      this.formPending = true

      const data = {
        section: 'POST',
        section_id: this.$randomId,
        file: this.formData.fileinput.file
      }

      const photo = this.formData.photo

      photo.photo_date = this.todaysDate()

      if (!photo.id || photo.id <= 0) {
        photo.id = this.$randomId
      }

      if (!photo.id || photo.id < 0) {
        photo.id = this.$randomId
      }

      const params = {
        id: photo.id,
        fileinput: data,
        photo: photo
      }

      params.id = photo.id
      params.photo.post_id = this.$randomId

      delete (params.photo.id)

      this.$apollo.mutate({
        mutation: gql`
        mutation sendFile ($id: ID!, $fileinput: PhotoFileInput!, $photo: PhotoInput) {
          photo: photoFileUpdate(id: $id, fileinput: $fileinput, photo: $photo) {
            id
            caption
            description
            subject
            photo_date
            author
            poi_name
            poi_id
            image {
              ext
              uri {
                thumb
                medium
                big
              }
            }
          }
        }`,
        variables: params
      }).then(r => {
        // eslint-disable-next-line no-console
        console.log('r :', r)
        this.resetForm()
        this.formPending = false
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Upload Successful',
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }).catch(e => {
        // eslint-disable-next-line no-console
        console.log('e :', e)
        this.formPending = false
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Upload Failed',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      })
    },
    todaysDate () {
      const today = new Date()
      return today.toISOString()
    },
    resetForm () {
      this.$refs.fileUploader.clear()

      for (const i in this.formData) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.formData.hasOwnProperty(i)) {
          Object.keys(this.formData[i]).forEach((key, index) => {
            this.formData[i][key] = null
          })
        }
      }
    }
  },
  created () {
    if (this.user && this.user.uname) {
      this.formData.photo.author = this.user.uname
    }
  },
  mounted () {
    this.todaysDate()
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
