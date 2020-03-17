<template>
  <div class="gallery-tab">
    <layout
      name="layout-two-thirds"
    >
      <template #sidebar>
        <gallery-upload-form />
      </template>
      <template #main>
        <div v-if="loading">
          <loading-block text="loading media" />
        </div>
        <div v-else-if="formattedData">
          <vue-picture-swipe
            ref="pictureSwipe"
            :items="formattedData"
          />
        </div>
        <div v-else>
          <error-block />
        </div>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { galleryActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { galleryUploadForm } from './components'
import { Layout } from '@/app/global/layout'
export default {
  name: 'gallery-tab',
  components: {
    ErrorBlock,
    LoadingBlock,
    galleryUploadForm,
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
    }
  },
  watch: {
    photos (val) {
      this.formatData(val)
    }
  },
  methods: {
    loadData () {
      if (!this.$store.state.riverDetailState.galleryData.data && !this.error) {
        this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, this.riverId)
      }
    },
    /**
     * We need to structure the data so photoswipe will accept
     * @param {Array<object>} photos accepts query results
     * @link https://github.com/rap2hpoutre/vue-picture-swipe
     *
     */
    formatData (photos) {
      if (photos) {
        const data = []

        for (let i = 0; i < photos.length; i++) {
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
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
.gallery-tab {
  padding-top: 2rem;
  .img-thumb {
    cursor: pointer;
    display: inline-block;
    height: 200px;
    width: 200px;
    margin: $spacing-md;
    @include MQ("LG") {
      width: 33%;
    }
    .thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &.video {
        background-color: $ui-03;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
      }
    }
  }
  .lightbox {
    position: fixed;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    background-color: rgba(#000, 0.95);
    top: 0;
    left: 0;

    .close-btn {
      position: fixed;
      top: 0;
      right: 0;
    }
    .prev-btn {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .next-btn {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .grid-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .bx--grid {
        height: 90vh;
        .bx--row {
          height: 100%;
          .media-container {
            display: flex;
            // need to mess with this width value
            min-width: calc(75vw - 350px);
            height: 100%;
            justify-content: center;
            align-items: center;
            img {
              @include ease;
              height: auto;
              width: auto;
              max-width: 100%;
              max-height: 90vh;
            }
          }
          .media-info {
            @include ease;
            height: 100%;
            background-color: $ui-01;
            position: relative;
            padding: $spacing-md;
            max-height: calc(100vh - 100px);
            min-width: 350px;
          }
        }
      }
    }
  }
}
</style>
