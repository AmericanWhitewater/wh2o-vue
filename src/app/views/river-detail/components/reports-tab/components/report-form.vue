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

    <multi-photo-uploader
      ref="multiPhotoUploader"
      :photos="report ? report.photos : []"
      :post="formData"
    />

    <cv-button-set>
      <cv-button @click.exact="handleSubmit" @keydown.enter="handleSubmit">
        Submit
      </cv-button>
    </cv-button-set>
  </div>
</template>
<script>
import { MultiPhotoUploader } from "@/app/global/components";
import { mapState } from "vuex";
import { gaugeHelpers } from "@/app/global/mixins";
import { updatePost } from "@/app/services";
import moment from "moment";

export default {
  name: "report-form",
  components: {
    MultiPhotoUploader,
  },
  mixins: [gaugeHelpers],
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
    }
  },
};
</script>
<style lang="scss">
</style>
