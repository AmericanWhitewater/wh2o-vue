<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-3">
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
      <figure
        v-for="(image, index) in images"
        :key="index"
        class="
          bx--col-sm-12 bx--col-md-2 bx--col-lg-3 bx--col-max-3
          mb-spacing-lg
          image-hover
        "
      >
        <img
          :src="imageURI(image, 'thumb')"
          :alt="formatAltText(image)"
          class="image-thumbnail"
        >
        <figcaption>
          <cv-button size="small" kind="danger" @click="clickDelete(image)"
            >Remove</cv-button
          >
        </figcaption>
      </figure>
    </div>
    <confirm-delete-modal ref="confirmDeleteModal" />
  </div>
</template>

<script>
import { ConfirmDeleteModal } from "@/app/global/components";
import { photoFileUpdate, deletePhoto } from "@/app/services";
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
    return { images: [] };
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data,
    }),
  },
  methods: {
    async setFile(input) {
      if (input && input.length) {
        input.forEach(async (f) => {
          await this.uploadImage(f.file);
        });
        this.$refs.fileUploader.clear();
      }
    },
    async uploadImage(file) {
      this.formPending = true;

      try {
        const photoPost = {
          photo: {
            id: "",
            author: this.user?.uname,
            photo_date: this.post.post_date,
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
      this.formPending = false;
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
  },
  mounted() {
    this.images = this.photos;
  },
};
</script>

<style lang="scss">
.reports-tab {
  .bx--file-browse-btn {
    max-width: unset;
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