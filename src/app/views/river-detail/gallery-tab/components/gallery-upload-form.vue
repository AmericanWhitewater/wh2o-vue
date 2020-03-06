<template>
  <div class="gallery-upload-form">
    <template v-if="!user">
      <error-block text="Log in to upload media" />
    </template>
    <template v-else>
      <hr>
      <h2>Upload Photos</h2>
      <cv-file-uploader
        ref="fileUploader"
        helper-text="Select the files you want to upload"
        drop-target-label="Drag and drop files here or click to upload"
        accept="image/jpg,image/png"
        clear-on-reselect
        initial-state-uploading
        multiple
        removable
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ErrorBlock } from '@/app/global/components'

export default {
  name: 'GalleryUploadForm',
  components: {
    ErrorBlock
  },
  computed: {
    ...mapState({
      user: state => state.userState.userData.data
    })
  }
}
</script>

<style lang="scss">
.gallery-upload-form {
}
</style>
