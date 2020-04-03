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
      placeholder="label"
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
      @click.exact="submitForm"
      @keydown.enter="submitForm"
    >
      Submit
    </cv-button>
  </div>
</template>
<script>
import { httpClient } from '@/app/global/services'
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
    async submitForm () {
      this.formPending = true
      await httpClient.post('/graphql', {
        query: `
          mutation($file: Upload!) {
            photoFileCreate(
              fileinput: {
                file: $file,
                section: ${this.section.toUpperCase()},
                section_id: "${0}"
              },
              photo: {
                author: "${this.formData.photo.author}",
                caption: "${this.formData.photo.caption}",
                subject: "${this.formData.photo.subject}",
                description: "${this.formData.photo.description}",
                photo_date: "${this.todaysDate()}",
                poi_id: "${this.formData.photo.poi_id}",
                post_id: "${this.$randomId}",
                poi_name: "${this.formData.photo.poi_name}"
              }
            ) {
              id
            }
          }`,
        variables: {
          file: this.formData.fileinput.file
        }
      }).then(r => {
        this.formPending = false
        // eslint-disable-next-line no-console
        console.log('r :', r)
      }).catch(e => {
        this.formPending = false
        // eslint-disable-next-line no-console
        console.log('e :', e)
      })
    },
    setFile (input) {
      /** single file upload for now... */
      this.formData.fileinput.file = input[0].file
    },
    todaysDate () {
      const today = new Date()
      return today.toISOString()
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
