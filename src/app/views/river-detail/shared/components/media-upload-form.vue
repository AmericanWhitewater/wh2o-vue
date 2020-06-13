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
      :disabled="formPending || !user"
      @change="setFile"
    />
    <cv-text-input
      v-model="formData.photo.author"
      class="mb-spacing-md"
      label="Author"
      required
      :disabled="formPending || !user"
    />
    <cv-text-input
      v-model="formData.photo.subject"
      class="mb-spacing-md"
      label="Subject"
      :disabled="formPending || !user"
    />
    <cv-text-input
      v-model="formData.photo.caption"
      class="mb-spacing-md"
      label="Caption"
      :disabled="formPending || !user"
    />
    <cv-dropdown
      v-if="rapids && rapids.length"
      v-model="formData.photo.poi_id"
      :disabled="formPending || !user"
      class="mb-spacing-md"
      label="Rapid"
    >
      <cv-dropdown-item
        v-for="(rapid, index) in rapids"
        :key="index"
        :value="rapid.id"
      >
        {{ rapid.name }}
      </cv-dropdown-item>
    </cv-dropdown>
    <cv-text-area
      v-model="formData.photo.description"
      label="Description"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="formPending || !user"
    />
  </div>
</template>
<script>
import { httpClient } from '@/app/global/services'
import { globalAppActions } from '@/app/global/state'
export default {
  name: 'media-upload-form',
  props: {
    section: {
      type: String,
      required: true,
      validator: val =>
        ['RAPID', 'POST', 'GALLERY', 'REACH'].indexOf(val) > -1
    },
    primaryClickTimestamp: {
      type: Number,
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
    /**
     * @todo break up nested objs. We dont need all that reactivity
     */
    formData: {
      id: null,
      fileinput: {
        file: null,
        section: null,
        section_id: null
      },
      photo: {
        author: null,
        caption: null,
        description: null,
        photo_date: null,
        poi_id: 0,
        poi_name: null,
        post_id: '0',
        subject: null
      }
    }
  }),

  computed: {
    rapids () {
      return this.$store.state.riverDetailState.rapidsData.data
    },
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
      this.submitForm()
    }
  },
  methods: {
    setFile (input) {
      if (input && input.length) {
        this.formData.fileinput.file = input[0].file
      }
    },
    /**
     * @todo clear form after file upload started but make copy incase error
     * @note how is upload getting linked to user and to reach? Shouldnt those be
     * added to the create call?
     *
     */
    async submitForm () {
      this.formPending = true
      await httpClient.post('/graphql', {
        operationName: null,
        query: 'mutation ($id: ID!,$fileinput:PhotoFileInput!, $photo: PhotoInput) {photo: photoFileUpdate(id: $id, fileinput: $fileinput, photo: $photo) {    id    caption    post_id    description    subject    photo_date    author    poi_name    poi_id    image {      ext      uri {        thumb        medium        big   }        }    }}',
        variables: {
          fileinput: this.formData.fileinput,
          id: this.formData.id,
          photo: this.formData.photo
        }
      }).then(res => {
        this.formPending = false
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Upload Successful',
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }).catch(err => {
        /* eslint-disable no-console */
        console.log('err :>> ', err)
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
    setInitialFormData () {
      const today = new Date()

      this.formData.photo.photo_date = today.toISOString()

      if (this.user && this.user.uname) {
        this.formData.photo.author = this.user.uname
      }

      this.formData.id = this.$randomId
      this.formData.fileinput.section = this.section
      this.formData.fileinput.section_id = this.$randomId
    }
  },
  created () {
    this.formData.id = this.$randomId
    this.formData.fileinput.section = this.section
    this.formData.fileinput.section_id = this.$randomId
    if (this.user && this.user.uname) {
      this.formData.photo.author = this.user.uname
    }
  },
  mounted () {
    this.setInitialFormData()
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
