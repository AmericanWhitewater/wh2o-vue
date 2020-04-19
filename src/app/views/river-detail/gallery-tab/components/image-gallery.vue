<template>
  <div class="image-gallery">
    <div class="bx--grid">
      <div class="bx--row">
        <template v-if="images.length">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="bx--col-sm-12 bx--col-md-4 mb-spacing-lg"
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
        <header>
          <cv-button @click.exact="closeLightbox">
            Close
          </cv-button>
        </header>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'image-gallery',
  props: {
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
    },
    activeImageDimensions: {
      height: null,
      width: null
    }
  }),
  computed: {
    activeImage () {
      if (this.lightbox.activeImage) {
        return this.images.find(image => image.id === this.lightbox.activeImage)
      }
      return null
    }
  },
  methods: {
    formatURI (image, thumb) {
      if (thumb) {
        return 'https://americanwhitewater.org' + image.thumb || image.medium || image.big
      }
      return 'https://americanwhitewater.org' + image.big || image.medium || image.thumb
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

      this.getImageDimensions(this.formatURI(this.activeImage.image.uri))
    },
    closeLightbox () {
      this.lightbox.active = false
      this.lightbox.activeImage = null
      document.body.classList.remove('bx--body--with-modal-open')
    },
    getImageDimensions (url) {
      const img = new Image()

      img.src = url

      img.onload = () => {
        this.activeImageDimensions.height = img.height
        this.activeImageDimensions.width = img.width
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-gallery {
  position: relative;
  .image-thumbnail {
    width:100%;
    cursor: pointer;
  }
  .lightbox-wrapper {
    height:100vh;
    width:100vw;
    position: fixed;
    top:0;
    left:0;
    z-index: 5;
    background-color:rgba(22, 22, 22, 0.98);
    display: flex;
    .lightbox-image-wrapper {
      width: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      height:100%;
      padding:$layout-md;
      img {
        max-height: 100%;
      }
    }
    .lightbox-sidebar {
      width:30%;
      background-color:#fff;
      height:100%;
    }
  }
}
</style>
