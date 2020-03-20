<template>
  <div class="gallery-upload-form">
    <hr>
    <h2>Upload Photos</h2>
    <cv-inline-notification
      kind="info"
      title="Login to Upload"
    />
    <cv-file-uploader
      ref="fileUploader"
      helper-text="Select the files you want to upload"
      drop-target-label="Drag and drop files here or click to upload"
      accept="image/jpg,image/png"
      clear-on-reselect
      initial-state-uploading
      multiple
      removable
      :disabled="!user"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'gallery-upload-form',
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
