<template>
  <cv-modal
    ref="modalWrapper"
    size="med"
    :visible="visible"
    @primary-click="handleSubmit"
    @secondary-click="handleCancel"
    @modal-shown="handleShow"
    @modal-hidden="handleCancel"
  >
    <template slot="label">
      <template v-if="label">
        {{ label }}
      </template>
    </template>
    <template slot="title">
      {{ title }}
    </template>
    <template slot="content">
      <div class="media-upload-form">
        <template v-if="!formPending">
          <template v-if="previewUrls.length">
            <img
              v-for="(item, k) in previewUrls"
              :key="k"
              :src="`${assetBaseUrl}${item}`"
              class="mb-spacing-sm"
            >
          </template>
          <cv-file-uploader
            v-if="!previewUrls.length"
            ref="fileUploader"
            data-modal-primary-focus
            helper-text="10mb max"
            accepts=".jpg,.png"
            class="mb-spacing-md"
            :disabled="formPending || !user"
            @change="setFile"
          />
        </template>
        <template v-else>
          <cv-loading :active="formPending" />
        </template>
        <cv-text-input
          v-model="formData.photo.author"
          class="mb-spacing-md"
          label="Author"
          required
          :disabled="formPending || !user"
        />
        <cv-text-input
          v-model="formData.photo.subject"
          class="mb-spacing-md"
          label="Subject"
          :disabled="formPending || !user"
        />
        <cv-text-input
          v-model="formData.photo.caption"
          class="mb-spacing-md"
          label="Caption"
          :disabled="formPending || !user"
        />
        <cv-text-input
          v-model="formData.photo.photo_date"
          label="Photo Date"
          class="mb-spacing-md"
          placeholder="yyyy-mm-dd"
          :invalid-message="dateInvalidMessage"
          :disabled="formPending || !user"
        />
        <cv-number-input
          v-model="postFormData.post.reading"
          label="Flow"
          class="mb-spacing-md"
        />
        <cv-select
          v-if="postFormData.post.reading"
          v-model="postFormData.post.metric_id"
          label="Gage Metric"
        >
          <cv-select-option
            v-for="(g, index) in metricOptions"
            :key="index"
            :value="String(g.id)"
            :label="g.label"
          />
        </cv-select>

        <cv-dropdown
          v-if="rapids && rapids.length"
          v-model="formData.photo.poi_id"
          :disabled="formPending || !user"
          class="mb-spacing-md"
          label="Rapid"
        >
          <cv-dropdown-item
            v-for="(rapid, index) in rapids"
            :key="index"
            :value="rapid.id"
          >
            {{ rapid.name }}
          </cv-dropdown-item>
        </cv-dropdown>
        <cv-text-area
          v-model="formData.photo.description"
          label="Description"
          :disabled="formPending || !user"
        />
      </div>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { shadowDomFixedHeightOffset } from "@/app/global/mixins";
import { updatePost, photoFileUpdate } from "@/app/services";
import { assetBaseUrl } from "@/app/environment";
import { mapState } from "vuex";
import { CvLoading } from "@carbon/vue/src/components/cv-loading";
import moment from "moment";

function initialState() {
  return {
    assetBaseUrl: assetBaseUrl,
    formPending: false,
    formData: {
      id: null,
      fileinput: {
        file: null,
        section: null,
        section_id: null,
      },
      photo: {
        author: null,
        caption: null,
        description: null,
        photo_date: null,
        poi_id: null,
        poi_name: null,
        post_id: null,
        subject: null,
      },
    },
    postFormData: {
      id: null,
      post: {
        reach_id: null,
        post_type: "PHOTO_POST",
        post_date: null,
        reading: null,
        metric_id: "2",
      },
    },
    previewUrls: [],
  };
}

export default {
  name: "media-upload-modal",
  components: { CvLoading },
  mixins: [shadowDomFixedHeightOffset],
  props: {
    title: {
      type: String,
      required: false,
      default: "Media Upload",
    },
    label: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    section: {
      type: String,
      required: true,
      validator: (val) =>
        ["RAPID", "POST", "GALLERY", "REACH"].indexOf(val) > -1,
    },
    // pass in media object from image gallery when used for editing
    media: {
      type: Object,
      required: false,
    },
  },
  data: initialState,
  computed: {
    ...mapState({
      metrics: (state) => state.RiverGages.data?.metrics ?? [],
      rapids: (state) => state.RiverRapids.data,
      user: (state) => state.User.data,
    }),
    dateInvalidMessage() {
      if (
        this.formData.photo.photo_date &&
        !/^\d{4}-\d{2}-\d{2}$/.test(this.formData.photo.photo_date)
      ) {
        return "Date must be in format YYYY-MM-DD";
      } else {
        return null;
      }
    },
    // users don't need to see all the possible metrics, just the ones they'll actually use
    // mimicked gage-chart-controls.vue, should probably refactor the way we treat metrics
    // across the board at some point
    metricOptions() {
      return this.metrics
        .filter((m) => [2, 8, 15].includes(parseInt(m.id)))
        .map((m) => ({
          id: m.id,
          label: m.name === "Flow" ? "CFS" : m.name,
        }));
    },
  },
  watch: {
    media: {
      immediate: true,
      handler() {
        this.setInitialFormData();
      },
    },
  },
  methods: {
    handleShow() {
      this.$emit("modal-shown");
      this.setModalOffset();
    },
    handleSubmit() {
      this.$emit("upload:submitted");
      this.submitPost();
    },
    handleCancel() {
      this.$emit("upload:cancelled");
    },
    async uploadFile() {
      this.formPending = true;
      try {
        const result = await photoFileUpdate(this.$apollo, this.formData);

        this.postFormData.id = result.post_id;
        const today = new Date();
        this.postFormData.post.post_date = today.toISOString();
        this.postFormData.post.reach_id = this.$route.params.id;
        this.previewUrls.push(result.image.uri.medium);
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
    // TODO: refactor this to use state so that when it submits, state is updated
    // with the results rather than having to trigger a full gallery reload
    async submitPost() {
      this.formPending = true;
      try {
        // TODO: get rid of this? not sure how, wrestled with carbon select for a while
        // before going with this.
        // carbon select won't allow an option that doesn't set model to ""
        // but graphql API blows up if we submit an empty string, so need to
        // convert to null before submission
        if (
          this.postFormData.post.metric_id === "" ||
          this.postFormData.post.metric_id === "null"
        ) {
          this.postFormData.post.metric_id = null;
        }
        // upload the details collected from the form, not just reach id etc.
        await updatePost(this.postFormData, {
          ...this.formData.photo,
          id: this.formData.id,
        });

        this.$emit("form:success");
        const formSuccessMessage = this.media
          ? "Media updated"
          : "Media uploaded";
        this.$store.dispatch("Global/sendToast", {
          title: formSuccessMessage,
          kind: "success",
        });
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log("error :>> ", error);
        this.$emit("form:error");
        this.$store.dispatch("Global/sendToast", {
          title:
            "Upload Failed -" +
            (error?.message ||
              Object.keys(error)
                .map((x) => error[x])
                .join(",")),
          kind: "error",
        });
      } finally {
        Object.assign(this.$data, initialState());
      }
    },
    setFile(input) {
      if (input && input.length) {
        this.formData.fileinput.file = input[0].file;
        this.uploadFile();
      }
    },
    setInitialFormData() {
      // if media is set, this is an edit request
      if (this.media) {
        this.previewUrls = [this.media.image.uri.medium];

        let dateInput;
        if (this.media.photo_date) {
          const date = moment(this.media.photo_date, "YYYY-MM-DD HH:mm:ss");
          dateInput = date.format("YYYY-MM-DD");
        }

        this.formData.id = this.media.id;
        Object.assign(this.formData.photo, {
          author: this.media.author,
          caption: this.media.caption,
          description: this.media.description,
          photo_date: dateInput,
          poi_id: this.media.poi_id,
          poi_name: this.media.poi_name,
          subject: this.media.subject,
          post_id: this.media.post_id,
        });

        this.postFormData.id = this.media.post_id;
        Object.assign(this.postFormData.post, {
          reach_id: this.media.reach_id,
          post_date: this.media.post_date,
          reading: this.media.reading,
          metric_id: String(this.media.metric_id),
        });
      } else {
        if (this.user && this.user.uname) {
          this.formData.photo.author = this.user.uname;
        }

        this.formData.id = `${this.$randomId()}`;
        this.formData.fileinput.section = this.section;
        this.formData.fileinput.section_id = this.$route.params.id;
      }
    },
  },
};
</script>
<style lang="scss">
.media-upload-form {
  .bx--modal .bx--text-input {
    background-color: #f4f7fb;
  }
}
</style>

<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
