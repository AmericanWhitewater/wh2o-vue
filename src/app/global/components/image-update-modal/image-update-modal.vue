<template>
  <cv-modal
    ref="modalWrapper"
    size="med"
    @primary-click="_confirm()"
    @modal-shown="setModalOffset"
    @modal-hidden="_cancel()"
  >
    <template slot="title">
      {{ modalTitle }}
    </template>

    <template slot="content">
      <div class="media-upload-form">
        <template v-if="editing">
          <img :src="imageURI(media, 'thumb')" class="mb-spacing-sm" >
        </template>
        <template v-else-if="previewUrl">
          <img :src="previewUrl" class="mb-spacing-sm" >
        </template>
        <template v-else>
          <cv-file-uploader
            v-if="!previewUrl"
            ref="fileUploader"
            data-modal-primary-focus
            dropTargetLabel="Drag and drop here or click to select (10mb max)"
            accepts=".jpg,.png"
            class="mb-spacing-md"
            :disabled="formPending || !user"
            @change="setFile"
          />
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
          label="Title"
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

        <template v-if="includePostFields">
          <cv-number-input
            v-model="formData.post.reading"
            label="Flow"
            class="mb-spacing-md"
          />
          <cv-select
            v-if="formData.post.reading"
            v-model="formData.post.metric_id"
            label="Gage Metric"
          >
            <cv-select-option
              v-for="(g, index) in metricOptions"
              :key="index"
              :value="String(g.id)"
              :label="g.label"
            />
          </cv-select>
        </template>

        <cv-select
          v-if="rapids && rapids.length"
          v-model="formData.photo.poi_id"
          :disabled="formPending || !user"
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
        <cv-text-area
          v-model="formData.photo.description"
          label="Description"
          :disabled="formPending || !user"
        />
      </div>
    </template>
    <template slot="secondary-button">Cancel</template>
    <template slot="primary-button">OK</template>
  </cv-modal>
</template>
<script>
import {
  assetUrl,
  shadowDomFixedHeightOffset,
  gaugeHelpers,
} from "@/app/global/mixins";
import { updatePost, updatePhoto, photoFileUpdate } from "@/app/services";
import { mapState } from "vuex";
import moment from "moment";

function initialState() {
  return {
    media: null, // currently editing -- passed via show()
    resolvePromise: undefined,
    rejectPromise: undefined,
    formPending: false,
    formData: {
      fileinput: {
        file: null,
        section: null,
        section_id: null,
      },
      photo: {
        id: null,
        author: null,
        caption: null,
        description: null,
        photo_date: null,
        poi_id: null,
        poi_name: null,
        post_id: null,
        subject: null,
      },
      post: {
        id: null,
        reach_id: null,
        post_type: "PHOTO_POST",
        post_date: null,
        reading: null,
        metric_id: "2",
      },
    },
    previewUrl: null,
  };
}

export default {
  name: "image-update-modal",
  mixins: [shadowDomFixedHeightOffset, assetUrl, gaugeHelpers],
  props: {
    section: {
      type: String,
      required: true,
      validator: (val) =>
        ["RAPID", "POST", "GALLERY", "REACH"].indexOf(val) > -1,
    },
    includePostFields: {
      type: Boolean,
      default: false,
    },
  },
  data: initialState,
  computed: {
    ...mapState({
      rapids: (state) => state.RiverRapids.data,
      user: (state) => state.User.data,
    }),
    modalTitle() {
      if (this.media) {
        return "Edit Photo";
      } else {
        return "Upload Photo";
      }
    },
    editing() {
      return !!this.media;
    },
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
  },
  methods: {
    show(opts = {}) {
      this.setInitialFormData(opts);

      this.$refs.modalWrapper.show();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    async _confirm() {
      await this.submitForm();
      this.resolvePromise({
        photo: this.formData.photo,
        post: this.formData.post,
      });
      this.$refs.modalWrapper.hide();
    },
    _cancel() {
      this.resolvePromise(false);
    },
    async uploadFile() {
      // this is only called when there is no image (i.e. create not edit)
      // meaning, as of now, this is only called when there is no post
      // if this modal were to be used to add photos to a post at some point,
      // it would need to reconfigure this method to save the photo to the post
      this.formPending = true;
      try {
        const result = await photoFileUpdate(this.$apollo, this.formData);

        this.formData.post.id = result.post_id;
        this.formData.photo.post_id = result.post_id;
        const today = new Date();
        this.formData.post.post_date = today.toISOString();
        this.formData.post.reach_id = this.$route.params.id;
        this.previewUrl = this.imageURI(result, "thumb");
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
    async submitForm() {
      this.formPending = true;
      try {
        // TODO: get rid of this? not sure how, wrestled with carbon select for a while
        // before going with this.
        // carbon select won't allow an option that doesn't set model to ""
        // but graphql API blows up if we submit an empty string, so need to
        // convert to null before submission
        if (
          this.formData.post.metric_id === "" ||
          this.formData.post.metric_id === "null"
        ) {
          this.formData.post.metric_id = null;
        }

        if (this.formData.photo.poi_id === "") {
          this.formData.photo.poi_id = null;
        }

        // if POST fields are in the form, update the post
        if (this.includePostFields) {
          await updatePost(this.formData.post);
        }

        await updatePhoto(this.formData.photo);

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
      }
    },
    setFile(input) {
      if (input && input.length) {
        this.formData.fileinput.file = input[0].file;
        this.uploadFile();
      }
    },
    setInitialFormData(opts = {}) {
      Object.assign(this.$data, initialState());

      // if media is set, this is an edit request
      if (opts.media) {
        this.media = opts.media;

        let dateInput;

        if (this.media.photo_date) {
          const date = moment(this.media.photo_date, "YYYY-MM-DD HH:mm:ss");
          dateInput = date.format("YYYY-MM-DD");
        }

        Object.assign(this.formData.photo, {
          id: this.media.id,
          author: this.media.author,
          caption: this.media.caption,
          description: this.media.description,
          photo_date: dateInput,
          poi_id: this.media.poi_id,
          poi_name: this.media.poi_name,
          subject: this.media.subject,
          post_id: this.media.post_id,
        });

        Object.assign(this.formData.post, {
          id: this.media.post_id,
          reach_id: this.media.reach_id,
          post_date: this.media.post_date,
          reading: this.media.reading,
          metric_id: String(this.media.metric_id),
        });
      } else {
        if (this.user && this.user.name) {
          this.formData.photo.author = this.user.name;
        }

        this.formData.photo.id = `${this.$randomId()}`;
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
