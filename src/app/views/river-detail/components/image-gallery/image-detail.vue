<template>
  <div ref="lightboxWrapper" class="lightbox-wrapper bx--col-12 mb-spacing-lg">
    <div class="lightbox-image-wrapper">
      <img
        class="active-image"
        :src="imageURI(image)"
        :alt="formatAltText(image)"
      >
      <cv-button-set
        v-if="prevImage || nextImage"
        class="gallery-navigation-buttons"
      >
        <cv-button
          id="previous-button"
          :disabled="!prevImage"
          @click.exact="$emit('navigateToImage', prevImage)"
        >
          Previous
        </cv-button>
        <cv-button
          id="next-button"
          :disabled="!nextImage"
          @click.exact="$emit('navigateToImage', nextImage)"
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
            @click.exact="$emit('navigateToImage', null)"
          >
            Close
          </cv-button>
        </header>
        <main>
          <h2
            v-if="image.caption"
            class="mb-spacing-md"
            v-text="image.caption"
          />
          <h2 v-else class="mb-spacing-md" v-text="'Untitled'" />
          <div class="mb-spacing-md">
            <h6>Description</h6>
            <div
              v-if="sanitizedDescription(image)"
              class="active-image-description"
              v-html="sanitizedDescription(image)"
            />
            <div v-else v-text="'n/a'" />
          </div>
          <div class="mb-spacing-md">
            <h6>Author</h6>
            <div v-if="image.author" v-text="image.author" />
            <div v-else v-text="'n/a'" />
          </div>
          <div class="mb-spacing-md">
            <h6>Subject</h6>
            <div v-if="image.subject" v-text="image.subject" />
            <div v-else v-text="'n/a'" />
          </div>
          <div class="mb-spacing-md">
            <h6>Photo Date</h6>
            <div v-text="imageDate(image)" />
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
            <span v-text="gaugeReading(image)" />
            <cv-link
              v-if="
                image.reading &&
                image.gauge &&
                image.gauge.id &&
                image.gauge.name
              "
              :to="`/gage-detail/${image.gauge.id}`"
            >
              at {{ image.gauge.name }}
            </cv-link>
          </div>
          <div class="mb-spacing-md">
            <h6>Filesize</h6>
            <span v-text="formatFileSize(image)" />
          </div>
          <div v-if="image.image && image.image.uri.big" class="mb-spacing-md">
            <cv-link :href="imageURI(image, 'big')"> Full resolution </cv-link>
          </div>
          <div v-if="canEdit(image)">
            <image-update-modal
              ref="imageUpdateModal"
              section="GALLERY"
              includePostFields
            />
            <cv-button
              id="edit-button"
              size="small"
              @click="openImageModal(image)"
            >
              Edit
            </cv-button>
          </div>
          <div v-if="canDelete(image)">
            <confirm-delete-modal ref="confirmDeleteModal" />
            <cv-button
              id="delete-button"
              kind="danger"
              size="small"
              @click="triggerPhotoDelete(image)"
            >
              Delete
            </cv-button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AwLogo,
  ConfirmDeleteModal,
  ImageUpdateModal,
} from "@/app/global/components";
import { mapState } from "vuex";
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
  assetUrl,
  imageHelpers,
} from "@/app/global/mixins";
import { deletePhoto } from "@/app/services";

export default {
  name: "image-detail",
  components: {
    AwLogo,
    ConfirmDeleteModal,
    ImageUpdateModal,
  },
  mixins: [
    shadowDomFixedHeightOffset,
    objectPermissionsHelpersMixin,
    assetUrl,
    imageHelpers,
  ],
  props: {
    image: {
      type: Object,
      required: true,
    },
    nextImage: {
      type: Object,
      required: false,
    },
    prevImage: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapState({
      river: (state) => state.RiverDetail.data,
      rapids: (state) => state.RiverRapids.data,
    }),

    imageRapid() {
      if (this.image && this.image.poi_id) {
        return this.rapids.find((rapid) => rapid.id === this.image.poi_id);
      }
      return null;
    },
    rapidName() {
      if (this.imageRapid && this.imageRapid.name) {
        return this.imageRapid.name;
      }
      return this.image.poi_name;
    },
    reachLocation() {
      return `${this.river?.river}, ${this.river?.section}`;
    },
  },
  methods: {
    async openImageModal(image) {
      const ok = await this.$refs.imageUpdateModal.show({
        media: image,
      });

      if (ok) {
        this.$emit("photoModified");
      }
    },
    async triggerPhotoDelete(photo) {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Photo",
        message: "Are you sure you want to delete this photo?",
      });
      if (ok) {
        // TODO: refactor to use state (along with 'news-tab.vue')
        try {
          this.$router.push({ name: "gallery-tab" });

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
  mounted() {
    // this is a really frustrating hack to deal with weird behavior
    // of position: fixed inside the shadow DOM when laravel mounted
    this.$nextTick(() => {
      this.$refs.lightboxWrapper.style = this.shadowDomFixedHeightOffset();
    });
  },
};
</script>

<style lang="scss" scoped>
.bx--btn-set .bx--btn:not(:focus) {
  box-shadow: none;
}
</style>