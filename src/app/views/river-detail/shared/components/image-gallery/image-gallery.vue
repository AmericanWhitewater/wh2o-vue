<template>
  <div class="image-gallery">
    <div class="bx--grid">
      <div class="bx--row">
        <template v-if="images.length">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="bx--col-sm-12 bx--col-md-4 bx--col-lg-4 bx--col-max-4 mb-spacing-lg"
          >
            <img
              :src="imageURI(image, 'thumb')"
              :alt="formatAltText(image)"
              class="image-thumbnail"
              @click.exact="openLightbox(image.id)"
            >
          </div>
        </template>
        <template v-else>
          <utility-block
            state="content"
            :text="emptyStateText"
          />
        </template>
      </div>
    </div>
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="activeImage"
        ref="lightboxWrapper"
        class="lightbox-wrapper"
      >
        <div class="lightbox-image-wrapper">
          <img
            class="active-image"
            :src="imageURI(activeImage)"
            :alt="formatAltText(activeImage)"
          >
        </div>
        <div class="lightbox-sidebar">
          <div>
            <header class="mb-md">
              <aw-logo />
              <cv-button
                id="close-button"
                size="small"
                kind="tertiary"
                @click.exact="closeLightbox"
              >
                Close
              </cv-button>
            </header>
            <main>
              <h2
                v-if="activeImage.caption"
                class="mb-spacing-md"
                v-text="activeImage.caption"
              />
              <h2
                v-else
                class="mb-spacing-md"
                v-text="'Untitled'"
              />
              <div class="mb-spacing-md">
                <h6>Description</h6>
                <div
                  v-if="activeImage.description"
                  class="active-image-description"
                  v-html="activeImage.description"
                />
                <div
                  v-else
                  v-text="'n/a'"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Author</h6>
                <div
                  v-if="activeImage.author"
                  v-text="activeImage.author"
                />
                <div
                  v-else
                  v-text="'n/a'"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Subject</h6>
                <div
                  v-if="activeImage.subject"
                  v-text="activeImage.subject"
                />
                <div
                  v-else
                  v-text="'n/a'"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Photo Date</h6>
                <div
                  v-text="imageDate(activeImage)"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Location</h6>
                <div
                  v-text="reachLocation"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Rapid</h6>
                <div
                  v-if="activeImage.poi_name"
                  v-text="activeImage.poi_name"
                />
                <div
                  v-else
                  v-text="'n/a'"
                />
              </div>
              <div class="mb-spacing-md">
                <h6>Level</h6>
                <span
                  v-text="gaugeReading(activeImage)"
                />
                <cv-link
                  v-if="activeImage.reading && activeImage.gauge && activeImage.gauge.id && activeImage.gauge.name"
                  :to="`/gage-detail/${activeImage.gauge.id}`"
                >
                  {{ activeImage.gauge.name }}
                </cv-link>
              </div>
              <div
                v-if="activeImage.image && activeImage.image.uri.big"
                class="mb-spacing-md"
              >
                <cv-link
                  :href="imageURI(activeImage, 'big')"
                >
                  Full resolution
                </cv-link>
              </div>
              <div v-if="images.length > 1">
                <cv-button-set>
                  <cv-button
                    id="previous-button"
                    :disabled="currentIndex === 0"
                    @click.exact="cycleImages('previous')"
                  >
                    Previous
                  </cv-button>
                  <cv-button
                    id="next-button"
                    :disabled="currentIndex === images.length - 1"
                    @click.exact="cycleImages"
                  >
                    Next
                  </cv-button>
                </cv-button-set>
              </div>
            </main>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { AwLogo } from '@/app/global/components'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
import { laravelDeploy, assetUrl } from '@/app/environment'
export default {
  name: 'image-gallery',
  components: {
    AwLogo,
    UtilityBlock
  },
  props: {
    emptyStateText: {
      type: String,
      required: false,
      default: 'No Images'
    },
    post: {
      type: Object,
      default: () => {},
      required: false
    },
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    lightbox: {
      active: false,
      activeImage: null
    }
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data
    }),
    activeImage () {
      if (this.lightbox.activeImage) {
        return this.images.find(
          image => image.id === this.lightbox.activeImage
        )
      }
      return null
    },
    reachLocation () {
      return `${this.river.river}, ${this.river.section}`
    },
    currentIndex () {
      if (this.lightbox.activeImage) {
        return this.images
          .map(image => {
            return image.id
          })
          .indexOf(this.activeImage.id)
      }
      return null
    }
  },
  methods: {
    // if we are in the laravel app, position: fixed doesn't work the same way
    // because it's embedded in a shadow dom, so we need to override the scss-defined
    // styling
    lightboxWrapperHeight () {
      if (laravelDeploy) {
        const height = window.scrollY + 79
        return `
          top: ${height}px;
          height: calc(100vh - 79px);
        `
      }
      return ''
    },
    imageURI (image, size) {
      const imageSizes = image.image.uri
      let desiredImage
      if (size === 'thumb') {
        desiredImage = imageSizes.thumb || imageSizes.medium || imageSizes.big
      } else if (size === 'big') {
        desiredImage = imageSizes.big || imageSizes.medium || imageSizes.thumb
      } else {
        desiredImage = imageSizes.medium || imageSizes.big || imageSizes.thumb
      }
      const basePath = assetUrl || ''
      return `${basePath}${desiredImage}`
    },
    formatAltText (image) {
      if (image.subject) {
        return image.subject
      } else if (image.caption) {
        return image.caption
      } else if (image.poi_name) {
        return image.poi_name
      } else {
        return 'Gallery Image'
      }
    },
    imageDate (image) {
      let date
      if (image.photo_date) {
        date = image.photo_date
      } else if (image.post_date) {
        date = image.post_date
      } else {
        return 'n/a'
      }
      return this.formatDate(date, 'll')
    },
    gaugeReading (image) {
      if (image.reading &&
          image.gauge &&
          image.gauge.name &&
          image.metric &&
          image.metric.unit) {
        return `${image.reading}${image.metric.unit} at`
      } else {
        return 'n/a'
      }
    },
    openLightbox (imageId) {
      this.lightbox.active = true
      this.lightbox.activeImage = imageId
      /**
       * @note this prevents scrolling. copied from carbon modal open event
       * just applies body { overflow: hidden }
       */
      document.body.classList.add('bx--body--with-modal-open')

      // this is a really frustrating hack to deal with weird behavior
      // of position: fixed inside the shadow DOM when laravel mounted
      this.$nextTick(() => {
        this.$refs.lightboxWrapper.style = this.lightboxWrapperHeight()
      })
    },
    closeLightbox () {
      this.lightbox.active = false
      this.lightbox.activeImage = null
      document.body.classList.remove('bx--body--with-modal-open')
    },
    cycleImages (direction) {
      if (this.images.length > 1) {
        if (direction === 'previous') {
          this.lightbox.activeImage = this.images[this.currentIndex - 1].id
        } else {
          this.lightbox.activeImage = this.images[this.currentIndex + 1].id
        }
      }
    }
  }
}
</script>
