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
            <router-link :to="`gallery/${image.id}`">
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
    <transition name="fade" mode="out-in">
      <div v-if="activeImage" ref="lightboxWrapper" class="lightbox-wrapper">
        <div class="lightbox-image-wrapper">
          <img
            class="active-image"
            :src="imageURI(activeImage)"
            :alt="formatAltText(activeImage)"
          >
          <cv-button-set
            v-if="images.length > 1"
            class="gallery-navigation-buttons"
          >
            <cv-button
              id="previous-button"
              :disabled="!prevImage"
              @click.exact="navigateTo(prevImage)"
            >
              Previous
            </cv-button>
            <cv-button
              id="next-button"
              :disabled="!nextImage"
              @click.exact="navigateTo(nextImage)"
            >
              Next
            </cv-button>
          </cv-button-set>
        </div>
        <div class="lightbox-sidebar">
          <div>
            <header class="mb-md">
              <aw-logo />
              <cv-button
                id="close-button"
                size="small"
                kind="tertiary"
                @click.exact="$router.push({ name: 'gallery-tab' })"
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
              <h2 v-else class="mb-spacing-md" v-text="'Untitled'" />
              <div class="mb-spacing-md">
                <h6>Description</h6>
                <div
                  v-if="sanitizedDescription"
                  class="active-image-description"
                  v-html="sanitizedDescription"
                />
                <div v-else v-text="'n/a'" />
              </div>
              <div class="mb-spacing-md">
                <h6>Author</h6>
                <div v-if="activeImage.author" v-text="activeImage.author" />
                <div v-else v-text="'n/a'" />
              </div>
              <div class="mb-spacing-md">
                <h6>Subject</h6>
                <div v-if="activeImage.subject" v-text="activeImage.subject" />
                <div v-else v-text="'n/a'" />
              </div>
              <div class="mb-spacing-md">
                <h6>Photo Date</h6>
                <div v-text="imageDate(activeImage)" />
              </div>
              <div class="mb-spacing-md">
                <h6>Location</h6>
                <div v-text="reachLocation" />
              </div>
              <div class="mb-spacing-md">
                <h6>Rapid</h6>
                <div v-if="rapidName" v-text="rapidName" />
                <div v-else v-text="'n/a'" />
              </div>
              <div class="mb-spacing-md">
                <h6>Level</h6>
                <span v-text="gaugeReading(activeImage)" />
                <cv-link
                  v-if="
                    activeImage.reading &&
                    activeImage.gauge &&
                    activeImage.gauge.id &&
                    activeImage.gauge.name
                  "
                  :to="`/gage-detail/${activeImage.gauge.id}`"
                >
                  at {{ activeImage.gauge.name }}
                </cv-link>
              </div>
              <div class="mb-spacing-md">
                <h6>Filesize</h6>
                <span v-text="formatFileSize(activeImage)" />
              </div>
              <div
                v-if="activeImage.image && activeImage.image.uri.big"
                class="mb-spacing-md"
              >
                <cv-link :href="imageURI(activeImage, 'big')">
                  Full resolution
                </cv-link>
              </div>
              <div v-if="canEdit(activeImage)">
                <media-upload-modal
                  :visible="mediaUploadModalVisible"
                  section="GALLERY"
                  :media="activeImage"
                  @upload:cancelled="mediaUploadModalVisible = false"
                  @form:success="handleEditSuccess"
                  @form:error="mediaUploadModalVisible = false"
                />
                <cv-button
                  id="edit-button"
                  size="small"
                  @click="mediaUploadModalVisible = true"
                >
                  Edit
                </cv-button>
              </div>
              <div v-if="canDelete(activeImage)">
                <confirm-delete-modal ref="confirmDeleteModal" />
                <cv-button
                  id="delete-button"
                  kind="danger"
                  size="small"
                  @click="triggerPhotoDelete(activeImage)"
                >
                  Delete
                </cv-button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { AwLogo, ConfirmDeleteModal } from "@/app/global/components";
import { mapState } from "vuex";
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
} from "@/app/global/mixins";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import { deletePhoto } from "@/app/services";

export default {
  name: "image-gallery",
  components: {
    AwLogo,
    ConfirmDeleteModal,
    UtilityBlock,
    MediaUploadModal: () => import("../media-upload-modal"),
  },
  mixins: [shadowDomFixedHeightOffset, objectPermissionsHelpersMixin],
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
  data: () => ({
    mediaUploadModalVisible: false,
  }),
  computed: {
    ...mapState({
      river: (state) => state.RiverDetail.data,
      rapids: (state) => state.RiverRapids.data,
      galleryPosts: (state) => state.RiverGallery.data,
    }),
    activeImage() {
      if (this.$route.params.photoId) {
        return this.images.find(
          (image) => image.id === this.$route.params.photoId
        );
      } else {
        return null;
      }
    },
    prevImage() {
      if (this.currentIndex && this.currentIndex > 0) {
        return this.images[this.currentIndex - 1];
      } else {
        return null;
      }
    },
    nextImage() {
      if (
        typeof (this.currentIndex === "number") &&
        this.currentIndex < this.images.length - 1
      ) {
        return this.images[this.currentIndex + 1];
      } else {
        return null;
      }
    },
    activeImageRapid() {
      if (this.activeImage && this.activeImage.poi_id) {
        return this.rapids.find(
          (rapid) => rapid.id === this.activeImage.poi_id
        );
      }
      return null;
    },
    rapidName() {
      if (this.activeImageRapid && this.activeImageRapid.name) {
        return this.activeImageRapid.name;
      }
      return this.activeImage.poi_name;
    },
    reachLocation() {
      return `${this.river.river}, ${this.river.section}`;
    },
    sanitizedDescription() {
      if (this.activeImage.description) {
        return this.$cleanContent(this.activeImage.description);
      }
      return null;
    },
    currentIndex() {
      if (this.activeImage) {
        return this.images
          .map((image) => {
            return image.id;
          })
          .indexOf(this.activeImage.id);
      }
      return null;
    },
  },
  watch: {
    activeImage(newImage, oldImage) {
      if (!newImage) {
        // lightbox closing
        document.body.classList.remove("bx--body--with-modal-open");
        this.$refs.lightboxWrapper.style = null;
      } else if (!oldImage) {
        // lightbox newly opening
        /**
         * @note this prevents scrolling. copied from carbon modal open event
         * just applies body { overflow: hidden }
         */
        document.body.classList.add("bx--body--with-modal-open");

        // this is a really frustrating hack to deal with weird behavior
        // of position: fixed inside the shadow DOM when laravel mounted
        this.$nextTick(() => {
          this.$refs.lightboxWrapper.style = this.shadowDomFixedHeightOffset();
        });
      }
    },
  },
  methods: {
    handleEditSuccess() {
      this.mediaUploadModalVisible = false;
      this.$emit("photoModified");
    },
    imageURI(image, size) {
      const imageSizes = image.image.uri;
      let desiredImage;
      if (size === "thumb") {
        desiredImage = imageSizes.thumb || imageSizes.medium || imageSizes.big;
      } else if (size === "big") {
        desiredImage = imageSizes.big || imageSizes.medium || imageSizes.thumb;
      } else {
        desiredImage = imageSizes.medium || imageSizes.big || imageSizes.thumb;
      }
      return this.assetUrl(desiredImage);
    },
    formatFileSize(image) {
      if (image.image.file_size) {
        return this.formatBytes(image.image.file_size);
      } else {
        return "n/a";
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    formatAltText(image) {
      if (image.subject) {
        return image.subject;
      } else if (image.caption) {
        return image.caption;
      } else if (image.poi_name) {
        return image.poi_name;
      } else {
        return "Gallery Image";
      }
    },
    imageDate(image) {
      if (!image.photo_date) {
        return "n/a";
      }
      return this.formatDate(image.photo_date, "ll");
    },
    gaugeReading(image) {
      if (image.reading && image.metric && image.metric.unit) {
        return `${image.reading}${image.metric.unit}`;
      } else {
        return "n/a";
      }
    },
    // navigates to another photo if passed a photo
    navigateTo(image) {
      if (image) {
        this.$router.push({ params: { photoId: image.id } });
      }
    },
    closeLightbox() {
      document.body.classList.remove("bx--body--with-modal-open");
      this.$refs.lightboxWrapper.style = null;
    },
    async triggerPhotoDelete(photo) {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Photo",
        message: "Are you sure you want to delete this photo?",
      });
      if (ok) {
        // TODO: refactor to use state (along with 'news-tab.vue')
        try {
          const result = await deletePhoto(photo.id);

          if (!result.errors) {
            this.$store.dispatch("Global/sendToast", {
              title: "Media deleted",
              kind: "success",
              override: true,
              contrast: false,
              action: false,
              autoHide: true,
            });
            this.$emit("photoModified");
          }
        } catch (error) {
          this.$store.dispatch("Global/sendToast", {
            title: "Delete Failed",
            kind: "error",
            override: true,
            contrast: false,
            action: false,
            autoHide: true,
          });
        }
      }
    },
  },
};
</script>
