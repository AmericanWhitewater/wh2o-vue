<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <cv-file-uploader
          ref="fileUploader"
          data-modal-primary-focus
          dropTargetLabel="Drag and drop here or click to select (10mb max)"
          accepts=".jpg,.png"
          class="mb-spacing-md"
          multiple
          @change="setFile"
        />
      </div>
    </div>
    <div
      v-for="(image, index) in images"
      :key="index"
      class="bx--row bx--tile mb-sm image-form"
    >
      <figure class="bx--col-sm-4 bx--col-md-3">
        <img
          :src="imageURI(image, 'thumb')"
          :alt="formatAltText(image)"
          class="image-thumbnail"
        >
      </figure>
      <div class="bx--col-sm-3 bx--col-md-4">
        <cv-text-input
          v-model="image.caption"
          class="mb-spacing-md"
          label="Title"
        />
        <cv-text-input
          v-model="image.subject"
          class="mb-spacing-md"
          label="Subject"
        />
        <cv-text-area
          v-model="image.description"
          label="Description"
          class="mb-spacing-md"
        />
        <cv-select
          v-if="rapids && rapids.length"
          v-model="image.poi_id"
          class="mb-spacing-md"
          label="Rapid"
        >
          <cv-select-option value>Choose an option</cv-select-option>
          <cv-select-option
            v-for="(rapid, index) in rapids"
            :key="index"
            :value="rapid.id"
          >
            {{ rapid.name }}
          </cv-select-option>
        </cv-select>
      </div>
      <div class="bx--col-sm-1 bx--col-md-1">
        <cv-button
          size="small"
          kind="danger"
          class="remove-image-button"
          @click="clickDelete(image)"
          >Remove</cv-button
        >
      </div>
    </div>
    <confirm-delete-modal ref="confirmDeleteModal" />
  </div>
</template>

<script>
import { ConfirmDeleteModal } from "@/app/global/components";
import { photoFileUpdate, updatePhoto, deletePhoto } from "@/app/services";
import { assetUrl, imageHelpers } from "@/app/global/mixins";
import { mapState } from "vuex";

export default {
  name: "multi-photo-uploader",
  components: {
    ConfirmDeleteModal,
  },
  mixins: [assetUrl, imageHelpers],
  props: {
    post: {
      type: Object,
      required: true,
    },
    photos: {
      type: Array,
      required: false,
    },
  },
  data: function () {
    return {
      images: [],
      uploadingImages: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      rapids: (state) => state.RiverRapids.data,
    }),
  },
  methods: {
    async setFile(input) {
      if (input && input.length) {
        input.forEach(async (f) => {
          if (!this.uploadingImages.includes(f)) {
            this.uploadingImages.push(f);
            await this.uploadImage(f.file);
            this.$refs.fileUploader.internalFiles.splice(
              this.$refs.fileUploader.internalFiles.indexOf(f),
              1
            );
            this.uploadingImages.splice(this.uploadingImages.indexOf(f), 1);
          }
        });
      }
    },
    async uploadImage(file) {
      try {
        const photoPost = {
          photo: {
            id: "",
            author: this.user?.name,
            photo_date: this.post.post_date,
            // need to include these fields to avoid gql automatically
            // populating with "n/a"
            description: "",
            subject: "",
            caption: "",
          },
          fileinput: {
            file: file,
            section: "POST",
            section_id: this.post.id,
          },
        };
        const result = await photoFileUpdate(this.$apollo, photoPost);
        this.images.unshift(result);
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log("error :>> ", error);
        this.$store.dispatch("Global/sendToast", {
          title:
            "Upload Failed -" +
            (error?.message ||
              Object.keys(error)
                .map((x) => error[x])
                .join(",")),
          kind: "error",
        });
      }
    },
    async clickDelete(photo) {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Remove Photo",
        message: "Are you sure you want to remove this photo?",
      });
      if (ok) {
        try {
          const result = await deletePhoto(photo.id);

          if (!result.errors) {
            this.images = this.images.filter((x) => x.id !== photo.id);
          }
        } catch (error) {
          // nothing
        }
      }
    },
    // submits each photo sub-form to save the photo fields from each photo
    async submitImages() {
      this.images.forEach(async (image) => {
        // image is the whole image object
        // we just want to submit the fields that are being updated
        const formSubmission = {
          id: image.id,
          subject: image.subject,
          photo_date: this.post.post_date,
          poi_id: image.poi_id || null, // selector returns "" instead of null which breaks graphql
          caption: image.caption,
          description: image.description,
        };
        await updatePhoto(formSubmission);
      });
    },
  },
  mounted() {
    this.images = this.photos;
  },
};
</script>

<style lang="scss">
.reports-tab {
  .remove-image-button {
    padding-right: 12px;
  }

  .image-form .bx--text-area__wrapper {
    height: 8rem;
  }

  .bx--btn-set {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    &.bx--btn:not(:focus) {
      -webkit-box-shadow: 0;
      box-shadow: 0;
    }
  }

  .bx--file__state-container {
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid rgb(0, 0, 0);
      border-color: rgb(0, 0, 0) transparent rgb(0, 0, 0) transparent;
      animation: upload-spinner 1.2s linear infinite;
    }
  }
}

@keyframes upload-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

figure.image-hover {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  * {
    box-sizing: border-box;
    transition: all 0.45s ease;
  }

  figcaption {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.1em;
    opacity: 0;
    z-index: 2;
    transition-delay: 0.1s;
    font-size: 24px;
    font-family: sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;

    button {
      width: 6rem;
    }
  }

  &:hover:before,
  &:hover:after {
    transform: scale(1);
    opacity: 1;
  }

  &:hover > img {
    opacity: 0.7;
  }

  &:hover figcaption {
    background: rgba(0, 0, 0, 0.5);
    opacity: 1;
  }
}
</style>