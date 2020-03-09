<template>
  <div class="gallery-tab">
    <div class="bx--row">
      <div class="bx--col-sm-8 bx--col-md-8 bx--col-lg-12">
        <template v-if="loading">
          <loading-block text="Loading media" />
        </template>
        <template v-if="!loading && error">
          <error-block
            title="Gallery unavailable"
            text="please try again later"
          />
        </template>
        <template v-if="!loading && !error && media.length > 0">
          <div
            v-for="(image, index) in media"
            :key="index"
            class="img-thumb"
          >
            <!-- <template v-if="isVideo(image.file.ext)">
              <div
                class="thumb video"
                @click="openLightbox(index)"
              >
                <h6>Video</h6>
                <p>{{ image.description.slice(0, 50) + "..." }}</p>
              </div>
            </template> -->
            <template>
              <img
                class="thumb"
                :src="
                  `https://americanwhitewater.org${image.url}`
                "
                @click="openLightbox(index)"
              >
            </template>
          </div>
        </template>
        <template v-if="!loading && !error && media.length === 0">
          <error-block
            title="No media"
            text="if ya got it, upload it."
          />
        </template>
      </div>
      <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-4">
        <gallery-upload-form />
      </div>
    </div>
    <template v-if="lightboxActive">
      <div class="lightbox">
        <cv-button
          kind="primary"
          class="close-btn"
          @click="closeLightbox"
        >
          Close
        </cv-button>

        <div class="grid-container">
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col-sm-8 bx--col-md-8 bx--col-lg-12">
                <div class="media-container">
                  <!-- <img
                :src="
                      `https://prerelease.americanwhitewater.org${
                        selectedMedia.file.uri.big
                      }`
                    "
                alt="photo name"
                  />-->
                  <!-- <template v-if="selectedMedia.file.ext === 'wmv'">
                    <cv-tile>
                      <div class="warning wmv">
                        <h1 class="mb-spacing-md">
                          Unable to play video
                        </h1>
                        <p class="mb-spacing-md">
                          This file type cannot play in the browser. Download to
                          view locally on your machine.
                        </p>
                        <cv-button
                          kind="tertiary"
                          small
                          v-text="'Download Video'"
                        />
                      </div>
                    </cv-tile>
                  </template> -->
                  <!-- <template v-else-if="isVideo(selectedMedia.file.ext)">
                    <video
                      width="320"
                      height="240"
                      controls
                    >
                      <source
                        :src="
                          `https://prerelease.americanwhitewater.org${selectedMedia.file.uri.big}`
                        "
                        :type="`video/${selectedMedia.file.ext}`"
                      >
                      Your browser does not support the video tag.
                    </video>
                  </template> -->
                  <template>
                    <img
                      :src="
                        `https://prerelease.americanwhitewater.org${selectedMedia.url}`
                      "
                      alt="photo name"
                    >
                  </template>
                </div>
              </div>
              <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-4">
                <div class="media-info">
                  <h5
                    class="mb-spacing-md"
                    v-text="selectedMedia.post.title"
                  />
                  <!-- <p>
                    Level {{ selectedMedia.post.reading }} [
                    {{ selectedMedia.post.metric }} ]
                  </p> -->
                  <p v-html="selectedMedia.description" />
                  <p v-text="selectedMedia.post.detail" />
                  <cv-button
                    kind="secondary"
                    small
                    class="prev-btn"
                    @click="prevMedia"
                  >
                    Prev
                  </cv-button>
                  <cv-button
                    kind="secondary"
                    small
                    class="next-btn"
                    @click="nextMedia"
                  >
                    Next
                  </cv-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { galleryActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { galleryUploadForm } from './components'

export default {
  name: 'GalleryTab',
  components: {
    ErrorBlock,
    LoadingBlock,
    galleryUploadForm
  },
  data: () => ({
    galleryHttpConfig: 'give me an error please',
    lightboxActive: false,
    selectedMediaIndex: null
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.galleryData.loading,
      error: state => state.riverDetailState.galleryData.error,
      media: state => state.riverDetailState.galleryData.data
    }),
    riverId () {
      return parseInt(this.$route.params.id, 10)
    },
    selectedMedia () {
      return this.media[this.selectedMediaIndex]
    }
  },
  methods: {
    loadData () {
      if (!this.$store.state.riverDetailState.galleryData.data && !this.error) {
        this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, this.riverId)
      }
    },
    isVideo (ext) {
      // dont accept wmv? can't play in browser.
      switch (ext) {
        case 'mp4':
          return true
        case 'mov':
          return true
        default:
          return false
      }
    },
    openLightbox (index) {
      this.selectedMediaIndex = index
      this.lightboxActive = true
    },
    closeLightbox () {
      this.lightboxActive = false
      this.selectedMediaIndex = null
    },
    prevMedia () {
      // if first image selected, cycle to last image
      if (this.selectedMediaIndex === 0) {
        this.selectedMediaIndex = this.media.length - 1
      } else {
        this.selectedMediaIndex--
      }
    },
    nextMedia () {
      // if last image selected, cycle to first image
      if (this.selectedMediaIndex !== this.media.length - 1) {
        this.selectedMediaIndex++
      } else {
        this.selectedMediaIndex = 0
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
