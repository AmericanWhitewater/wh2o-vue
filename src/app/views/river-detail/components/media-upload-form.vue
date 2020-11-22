<template>
  <div class="media-upload-form">
    <h2
      v-if="title"
      class="mb-spacing-md"
      v-text="title"
    />
    <template v-if="previewUrls.length">
      <img
        v-for="(item, k) in previewUrls"
        :key="k"
        :src="`${baseUrl}${item}`"
        class="mb-spacing-sm"
      >
    </template>
    <cv-file-uploader
      v-if="!previewUrls.length"
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

import { postUpdate, photoFileUpdate } from '@/app/services'
import { baseUrl } from '@/app/environment'

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
    baseUrl: baseUrl,
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
        poi_id: '0',
        poi_name: null,
        post_id: '0',
        subject: null
      }
    },
    postFormData: {
      id: null,
      post: {
        reach_id: null,
        post_type: 'PHOTO_POST',
        post_date: null
      }
    },
    previewUrls: []
  }),

  computed: {
    rapids () {
      return this.$store.state.RiverRapids.data
    },
    user () {
      return this.$store.state.User.data
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
      this.submitPost()
    }
  },
  methods: {
    setFile (input) {
      if (input && input.length) {
        this.formData.fileinput.file = input[0].file
        this.uploadFile()
      }
    },
    async uploadFile () {
      this.formPending = true
      try {
        const result = await photoFileUpdate(this.$apollo, this.formData)

        this.postFormData.id = result.data.photo.post_id
        this.postFormData.post.post_date = result.data.photo.photo_date
        this.postFormData.post.reach_id = this.$route.params.id
        this.previewUrls.push(result.data.photo.image.uri.big)

      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log('error :>> ', error);
      }
      this.formPending = false
    },
    async submitPost () {
      this.formPending = true
      try {
        await postUpdate(this.postFormData)
        this.$emit('form:success')
        this.$store.dispatch('Global/sendToast', {
          title: 'Media Uploaded',
          kind: 'success'
        })
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log('error :>> ', error)
        this.$emit('form:error')
        this.$store.dispatch('Global/sendToast', {
          title: 'Upload Failed',
          kind: 'error'
        })
      } finally {
        this.formPending = false
      }
    },
    setInitialFormData () {
      const today = new Date()
      this.formData.photo.photo_date = today.toISOString()

      if (this.user && this.user.uname) {
        this.formData.photo.author = this.user.uname
      }

      this.formData.id = this.$randomId()
      this.formData.fileinput.section = this.section
      this.formData.fileinput.section_id = this.$randomId()
    }
  },
  created () {
    this.setInitialFormData()
  }
}
</script>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
