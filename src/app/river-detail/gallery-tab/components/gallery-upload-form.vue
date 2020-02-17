<template>
  <div class="gallery-upload-form">
    <template v-if="!user">
      <error-block text="Log in to upload media" />
    </template>
    <template v-else>
      form
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
