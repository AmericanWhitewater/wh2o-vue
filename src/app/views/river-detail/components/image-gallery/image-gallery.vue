<template>
  <div class="image-gallery">
    <div class="bx--grid">
      <div class="bx--row">
        <image-detail
          v-if="activeImage"
          :image="activeImage"
          :nextImage="nextImage"
          :prevImage="prevImage"
          @navigateToImage="(img) => (activeImage = img)"
          @photoModified="$emit('photoModified', $event)"
        />
        <template v-if="images.length">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="
              bx--col-sm-12 bx--col-md-4 bx--col-lg-4 bx--col-max-4
              mb-spacing-lg
            "
          >
            <img
              :src="imageURI(image, 'thumb')"
              :alt="formatAltText(image)"
              class="image-thumbnail"
              @click.exact="activeImage = image"
            >
          </div>
        </template>
        <template v-else>
          <utility-block state="content" text="No images" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
  assetUrl,
  imageHelpers,
} from "@/app/global/mixins";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import ImageDetail from "./image-detail.vue";

export default {
  name: "image-gallery",
  components: {
    ImageDetail,
    UtilityBlock,
  },
  mixins: [
    shadowDomFixedHeightOffset,
    objectPermissionsHelpersMixin,
    assetUrl,
    imageHelpers,
  ],
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
    galleryType: {
      type: String,
      default: () => "gallery-tab",
    },
  },
  data: () => ({
    activeImage: null,
  }),
  computed: {
    ...mapState({
      river: (state) => state.RiverDetail.data,
      rapids: (state) => state.RiverRapids.data,
    }),
    routeImage() {
      if (this.$route.params.imageId) {
        return this.images.find(
          (image) => image.id === this.$route.params.imageId
        );
      } else {
        return null;
      }
    },
    nextImage() {
      if (this.activeImage) {
        const index = this.images.findIndex(
          (x) => x.id === this.activeImage.id
        );
        return index < this.images.length - 1 ? this.images[index + 1] : null;
      }
      return null;
    },
    prevImage() {
      if (this.activeImage) {
        const index = this.images.findIndex(
          (x) => x.id === this.activeImage.id
        );
        return index > 0 ? this.images[index - 1] : null;
      }
      return null;
    },
    // the gallery tab uses routing to create canonical links for images
    // other uses of the gallery do not route to specific images
    // so we use this to condition the behavior just to the gallery tab
    galleryTab() {
      return this.galleryType === "gallery-tab";
    },
  },
  watch: {
    activeImage(newImage, oldImage) {
      if (newImage) {
        if (!oldImage) {
          // lightbox newly opening
          /**
           * @note this prevents scrolling. copied from carbon modal open event
           * just applies body { overflow: hidden }
           */
          document.body.classList.add("bx--body--with-modal-open");
        }

        // we are navigating to a new image and if we're in the gallery tab,
        // we need to use the router to do this
        // need to avoid attempting to route when the page is opened already on the
        // gallery-detail route though
        if (this.galleryTab && this.routeImage?.id !== newImage.id) {
          this.$router.push({
            name: "gallery-detail",
            params: { imageId: newImage.id },
          });
        }
      } else {
        // lightbox closing
        document.body.classList.remove("bx--body--with-modal-open");

        if (this.galleryTab) {
          this.$router.push({ name: "gallery-tab" });
        }
      }
    },
  },
  mounted() {
    if (this.routeImage) {
      this.activeImage = this.routeImage;
    }
  },
};
</script>
<style lang="scss">
// src/app/views/river-detail/shared/components/image-gallery/image-gallery.vue

.image-gallery {
  position: relative;

  .image-thumbnail {
    cursor: pointer;
    width: 100%;
  }

  .lightbox-wrapper {
    background-color: #fff;
    display: flex;
    height: 100vh;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;

    @include carbon--breakpoint("sm") {
      flex-flow: column nowrap;
    }

    @include carbon--breakpoint("md") {
      flex-flow: row nowrap;
    }

    .lightbox-image-wrapper {
      align-items: center;
      background-color: rgba(22, 22, 22, 0.98);
      display: flex;
      height: 100%;
      justify-content: center;
      padding: $layout-md;
      position: relative;

      @include carbon--breakpoint("sm") {
        width: 100%;
      }

      @include carbon--breakpoint("md") {
        width: 70%;
      }

      img {
        max-height: 100%;
      }

      .gallery-navigation-buttons {
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        left: 0;
        position: absolute;
        width: 100%;

        .bx--btn {
          display: flex;
          justify-content: center;
          padding: 0;
          width: 6rem;
        }
      }
    }

    .lightbox-sidebar {
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      justify-content: space-between;
      padding: $spacing-md;

      @include carbon--breakpoint("sm") {
        width: 100%;
      }

      @include carbon--breakpoint("md") {
        width: 30%;
      }

      header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      .active-image-description {
        @include carbon--type-style("body-long-02");
      }
    }
  }
}
</style>