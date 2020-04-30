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
              :src="formatURI(image.image.uri, 'thumb')"
              :alt="formatAltText(image)"
              class="image-thumbnail"
              @click.exact="openLightbox(image.id)"
            >
          </div>
        </template>
        <template v-else>
          No images
        </template>
      </div>
    </div>
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="activeImage"
        class="lightbox-wrapper"
      >
        <div class="lightbox-image-wrapper">
          <img
            class="active-image"
            :src="formatURI(activeImage.image.uri)"
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
            <cv-toolbar>
              <cv-overflow-menu class="bx--toolbar-action">
                <template slot="trigger">
                  <Download20
                    class="bx--overflow-menu__icon bx--toolbar-filter-icon"
                  />
                </template>
              </cv-overflow-menu>
              <cv-overflow-menu class="bx--toolbar-action">
                <template slot="trigger">
                  <Maximize16
                    class="bx--overflow-menu__icon bx--toolbar-filter-icon"
                  />
                </template>
              </cv-overflow-menu>
            </cv-toolbar>
            <hr>
            <main>
              <h2
                v-if="activeImage.title"
                class="mb-spacing-md"
                v-text="activeImage.title"
              />
              <h2
                v-else
                class="mb-spacing-md"
                v-text="'Untitled'"
              />
              <div class="mb-spacing-md">
                <h6>Photo Date</h6>
                <div
                  v-if="activeImage.photo_date"
                  v-text="activeImage.photo_date"
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
                <h6>Caption</h6>
                <p
                  v-if="activeImage.caption"
                  v-text="activeImage.caption"
                />
                <p
                  v-else
                  v-text="'n/a'"
                />
              </div>
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
            </main>
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
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { AwLogo } from '@/app/global/components'
export default {
  name: 'image-gallery',
  components: {
    AwLogo
  },
  props: {
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
    activeImage () {
      if (this.lightbox.activeImage) {
        return this.images.find(
          image => image.id === this.lightbox.activeImage
        )
      }
      return null
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
    formatURI (image, thumb) {
      if (thumb) {
        return (
          'https://americanwhitewater.org' + image.thumb ||
          image.medium ||
          image.big
        )
      }
      return (
        'https://americanwhitewater.org' + image.big ||
        image.medium ||
        image.thumb
      )
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
    openLightbox (imageId) {
      this.lightbox.active = true
      this.lightbox.activeImage = imageId
      /**
       * @note this prevents scrolling. copied from carbon modal open event
       * just applies body { overflow: hidden }
       */
      document.body.classList.add('bx--body--with-modal-open')
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
<style lang="scss" scoped>
.image-gallery {
  position: relative;
  .image-thumbnail {
    width: 100%;
    cursor: pointer;
  }
  .lightbox-wrapper {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(22, 22, 22, 0.98);
    display: flex;
    @include carbon--breakpoint("sm") {
      flex-flow: column nowrap;
    }
    @include carbon--breakpoint("md") {
      flex-flow: row nowrap;
    }
    .lightbox-image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: $layout-md;
      @include carbon--breakpoint("sm") {
        width: 100%;
      }
      @include carbon--breakpoint("md") {
        width: 70%;
      }
      img {
        max-height: 100%;
      }
    }
    .lightbox-sidebar {
      background-color: #fff;
      height: 100%;
      padding: $spacing-md;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      @include carbon--breakpoint("sm") {
        width: 100%;
      }
      @include carbon--breakpoint("md") {
        width: 30%;
      }
      header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
      }
      .active-image-description {
        @include carbon--type-style("body-long-02");
      }
      .bx--btn-set > .bx--btn {
        max-width: 50%;
      }
    }
  }
}
</style>
