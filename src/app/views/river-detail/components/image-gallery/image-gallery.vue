<template>
  <div class="image-gallery">
    <div class="bx--grid">
      <div class="bx--row">
        <image-detail
          v-if="activeImage"
          :image="activeImage"
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
            <router-link
              :to="{ name: 'gallery-detail', params: { imageId: image.id } }"
            >
              <img
                :src="imageURI(image, 'thumb')"
                :alt="formatAltText(image)"
                class="image-thumbnail"
              >
            </router-link>
          </div>
        </template>
        <template v-else>
          <utility-block state="content" :text="emptyStateText" />
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
    emptyStateText: {
      type: String,
      required: false,
      default: "No Images",
    },
    post: {
      type: Object,
      default: () => {},
      required: false,
    },
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      river: (state) => state.RiverDetail.data,
      rapids: (state) => state.RiverRapids.data,
    }),
    activeImage() {
      if (this.$route.params.imageId) {
        return this.images.find(
          (image) => image.id === this.$route.params.imageId
        );
      } else {
        return null;
      }
    },
  },
  watch: {
    activeImage: {
      handler: (newImage, oldImage) => {
        if (!newImage) {
          // lightbox closing
          document.body.classList.remove("bx--body--with-modal-open");
        } else if (!oldImage) {
          // lightbox newly opening
          /**
           * @note this prevents scrolling. copied from carbon modal open event
           * just applies body { overflow: hidden }
           */
          document.body.classList.add("bx--body--with-modal-open");
        }
      },
      immediate: true,
    },
  },
};
</script>
