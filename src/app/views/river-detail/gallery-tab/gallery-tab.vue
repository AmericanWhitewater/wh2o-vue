<template>
  <div class="gallery-tab">
    <layout name="layout-two-thirds">
      <template #sidebar>
        <media-upload-form
          title="Upload Media"
          section="gallery"
        />
      </template>
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" />
        </template>
        <template v-else-if="photos">
          <vue-picture-swipe
            v-if="formattedData && formattedData.length > 0"
            ref="pictureSwipe"
            :items="formattedData"
          />
          <utility-block
            v-if="!formattedData"
            state="content"
            title="No Media"
            text="if you have media for this reach, please share"
          />
        </template>
        <template v-else>
          <utility-block state="error" />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { galleryActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { MediaUploadForm } from '../shared/components'
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
    Layout
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
    /**
     * We need to structure the data so photoswipe will accept
     * @param {Array<object>} photos accepts query results
     * @link https://github.com/rap2hpoutre/vue-picture-swipe
     *
     */
    formatData (photos) {
      if (photos) {
        const data = []
        const numberOfImages = photos.length
        for (let i = 0; i < numberOfImages; i++) {
          const input = {
            src: null,
            thumbnail: null,
            w: null,
            h: null,
            title: null
          }
          /** big size is priority use thumb as fallback */
          input.src =
            'https://americanwhitewater.org' + photos[i].image.uri.big ||
            photos[i].image.uri.medium ||
            photos[i].image.uri.thumb
          /** medium size is priority use thumb as fallback */
          input.thumbnail =
            'https://americanwhitewater.org' + photos[i].image.uri.medium ||
            photos[i].image.uri.thumb
          /**
           * image caption
           * @todo add rapid, reading if available
           *
           */
          input.title = photos[i].post.user
            ? 'Photo: ' + photos[i].post.user.uname
            : null

          if (input.src && input.thumbnail) {
            /**
             * vue-picture-swipe requires the image dimensions
             * for the lightbox to work properly.
             *
             * to get that info, we create a new Image()
             * then store the height and width for each
             *
             * @todo there may be performance implications
             * creating new Image() when we get a lot of query results
             *
             */
            const img = new Image()
            img.onload = () => {
              input.h = img.height
              input.w = img.width
            }
            img.src = input.src
            data.push(input)
          }
        }
        this.formattedData = data
        return
      }
      this.formattedData = []
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
