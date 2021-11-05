<template>
  <div>
    <cv-text-input
      v-model="formData.title"
      label="Title"
      theme="light"
      class="mb-spacing-md"
    />
    <cv-text-input
      v-model="formData.post_date"
      label="Report Date"
      theme="light"
      placeholder="yyyy-mm-dd"
      :invalid-message="dateInvalidMessage"
      class="mb-spacing-md"
    />

    <div class="bx--row">
      <cv-number-input
        v-model="formData.reading"
        label="Flow"
        class="mb-spacing-md bx--col-sm-12 bx--col-md-4"
      />
      <div class="bx--col-sm-12 bx--col-md-4">
        <cv-select
          v-if="formData.reading"
          v-model="formData.metric_id"
          label="Gage Metric"
        >
          <cv-select-option
            v-for="(g, index) in metricOptions"
            :key="index"
            :value="String(g.id)"
            :label="g.label"
          />
        </cv-select>
      </div>
    </div>

    <!-- TODO: add a gauge selector? !-->

    <cv-text-area
      v-model="formData.detail"
      label="Description"
      theme="light"
      class="mb-spacing-md"
    />

    <div v-if="images.length" class="bx--grid">
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
            <cv-button size="small" kind="secondary" @click="clickEdit(image)"
              >Edit</cv-button
            >
            <cv-button size="small" kind="danger" @click="clickDelete(image)"
              >Remove</cv-button
            >
          </figcaption>
        </figure>
      </div>
    </div>
    <confirm-delete-modal ref="confirmDeleteModal" />
    <image-update-modal ref="imageUpdateModal" section="GALLERY" />

    <cv-button-set>
      <cv-button @click.exact="handleSubmit" @keydown.enter="handleSubmit">
        Submit
      </cv-button>
    </cv-button-set>
  </div>
</template>
<script>
import { ConfirmDeleteModal, ImageUpdateModal } from "@/app/global/components";
import { mapState } from "vuex";
import { gaugeHelpers, assetUrl, imageHelpers } from "@/app/global/mixins";
import { updatePost, photoFileUpdate, deletePhoto } from "@/app/services";
import moment from "moment";

export default {
  name: "report-form",
  components: {
    ConfirmDeleteModal,
    ImageUpdateModal,
  },
  mixins: [gaugeHelpers, assetUrl, imageHelpers],
  props: {
    report: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {
      formData: {
        id: null,
        detail: null,
        gauge_id: null,
        metric_id: "2",
        post_date: null,
        post_type: null,
        reach_id: null,
        reading: null,
        title: null,
        user_id: null,
      },
      formPending: false,
      images: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data,
    }),
    reachId() {
      return this.$route.params.id;
    },
    dateInvalidMessage() {
      if (
        this.formData.post_date &&
        !/^\d{4}-\d{2}-\d{2}$/.test(this.formData.post_date)
      ) {
        return "Date must be in format YYYY-MM-DD";
      } else {
        return null;
      }
    },
  },
  methods: {
    async handleSubmit() {
      this.formPending = true;

      // since user is a state property, it can't always be populated
      // immediately when the component is mounted, so we insure it's
      // set here before submission
      if (!this.formData.user_id) {
        this.formData.user_id = this.user?.uid;
      }

      // TODO: get rid of this? not sure how, wrestled with carbon select for a while
      // before going with this.
      // carbon select won't allow an option that doesn't set model to ""
      // but graphql API blows up if we submit an empty string, so need to
      // convert to null before submission
      if (
        this.formData.metric_id === "" ||
        this.formData.metric_id === "null"
      ) {
        this.formData.metric_id = null;
      }

      try {
        const result = await updatePost(this.formData);
        this.formPending = false;

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Success",
            subtitle: "Report saved.",
          });
          this.$store.dispatch(
            "RiverReports/getProperty",
            this.$route.params.id
          );

          this.$router.push({ name: "reports-tab" });
        } else {
          this.handleError(result.errors);
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(errors) {
      this.$store.dispatch("Global/sendToast", {
        kind: "error",
        title: "Error",
        subtitle:
          "Failed to save report: " +
          Object.keys(errors)
            .map((x) => errors[x]?.message ?? "")
            .join(","),
      });
    },
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
            photo_date: this.formData.post_date,
          },
          fileinput: {
            file: file,
            section: "POST",
            section_id: this.formData.id,
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
    async clickEdit(photo) {
      const results = await this.$refs.imageUpdateModal.show({
        media: photo,
      });

      // update the report with the modified image
      if (results) {
        Object.assign(
          this.images.find((x) => x.id === results.photo.id),
          results.photo
        );
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
  },
  mounted() {
    // if no report prop passed, creating a new report
    // so we create ID and populate hidden fields
    if (!this.report) {
      this.formData.id = `${this.$randomId()}`;
      this.formData.post_type = "JOURNAL";
      this.formData.reach_id = this.reachId;

      // default to today
      const today = new Date();
      this.formData.post_date = today.toISOString().slice(0, 10);
    } else {
      Object.keys(this.formData).forEach((key) => {
        if (key === "post_date") {
          this.formData[key] = moment(
            this.report[key],
            "YYYY-MM-DD HH:mm:ss"
          ).format("YYYY-MM-DD");
        } else {
          this.formData[key] = this.report[key];
        }
      });
      this.images = this.report.photos;
    }
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
}
</style>
