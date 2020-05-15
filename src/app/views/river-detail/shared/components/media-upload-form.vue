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
        v-for="(rapid,index) in rapids"
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
import gql from 'graphql-tag'
import { globalAppActions } from '@/app/global/state'
import { rapidsActions } from '@/app/views/river-detail/shared/state'
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
        poi_id: null,
        poi_name: null,
        post_id: null,
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
      this.formData.fileinput.file = input[0].file
    },
    /**
     * @todo clear form after file upload started but make copy incase error
     * @note how is upload getting linked to user and to reach? Shouldnt those be
     * added to the create call?
     *
     */
    submitForm () {
      this.formPending = true
      this.$apollo.mutate({
        mutation: gql`
        mutation sendFile ($id: ID!, $fileinput: PhotoFileInput!, $photo: PhotoInput) {
          photoFileUpdate(id: $id, fileinput: $fileinput, photo: $photo) {
            id,
            caption,
            post_id,
            description,
            subject,
            photo_date,
            author,
            poi_name,
            poi_id
            image {
                ext,
                uri {
                    thumb,
                    medium,
                    big
                }
            }
          }
        }`,
        variables: this.formData
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
    setInitialFormData () {
      const today = new Date()

      this.formData.photo.photo_date = today.toISOString()

      if (this.user && this.user.uname) {
        this.formData.photo.author = this.user.uname
      }

      this.formData.id = this.$randomId
      this.formData.fileinput.section = this.section
      this.formData.fileinput.section_id = this.$randomId
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
    this.$store.dispatch(
      rapidsActions.FETCH_RAPIDS_DATA,
      this.$route.params.id
    )
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
