<template>
  <div class="gallery-tab">
    <layout name="layout-full-width">
      <template #sidebar>
        <media-upload-form
          title="Upload Media"
          section="gallery"
        />
      </template>
      <template #main>
        <template v-if="loading">
          <utility-block
            state="loading"
            class="mb-sm"
          />
        </template>
        <template v-else-if="photos">
          <template v-if="formattedData && formattedData.length > 0">
            <image-gallery
              :images="formattedData"
            />
          </template>
          <template v-else>
            <utility-block
              state="content"
              title="No Media"
              text="if you have media for this reach, please share"
              class="mb-sm"
            />
          </template>
        </template>
        <template v-else>
          <utility-block
            state="error"
            class="mb-sm"
          />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { galleryActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { MediaUploadForm, ImageGallery } from '../shared/components'
import { Layout } from '@/app/global/layout'
/**
 * @todo the gallery needs to be a standalone component
 * which you can pass an array of images to
 *
 */
export default {
  name: 'gallery-tab',
  components: {
    UtilityBlock,
    MediaUploadForm,
    Layout,
    ImageGallery
  },
  data: () => ({
    formattedData: null
  }),

  computed: {
    ...mapState({
      loading: state => state.riverDetailState.galleryData.loading,
      error: state => state.riverDetailState.galleryData.error,
      photos: state => state.riverDetailState.galleryData.data
    }),
    riverId () {
      return parseInt(this.$route.params.id, 10)
    },
    stateTest () {
      return this.$store.state.riverDetailState.galleryData
    }
  },
  watch: {
    photos (val) {
      this.formatData(val)
    }
  },
  methods: {
    formatData (media) {
      if (media) {
        const data = []

        const numberOfImages = media.length

        for (let i = 0; i < numberOfImages; i++) {
          const numbeOfPostImages = media[i].photos.length

          for (let k = 0; k < numbeOfPostImages; k++) {
            data.push(media[i].photos[k])
          }
        }

        this.formattedData = data
      }
    }
  },
  created () {
    this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, this.riverId)
  }
}
</script>
<style lang="scss">
.gallery-tab {
  padding-top: 2rem;
  // give the photoswipe thumbnails some style
  img[itemprop="thumbnail"] {
    height: 200px;
    object-fit: cover;
    @include carbon--breakpoint("md") {
      width: 250px;
      height: 250px;
    }
    @include carbon--breakpoint("lg") {
      width: 350px;
      height: 250px;
    }
  }
}
</style>
