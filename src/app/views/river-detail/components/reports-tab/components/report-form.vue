<template>
  <div class="report-form">
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

    <cv-select v-model="formData.gauge_id" label="Gage" class="mb-spacing-md" @change="changeGauge">
      <cv-select-option value="">None</cv-select-option>
      <cv-select-option
        v-for="(g, index) in gagesWithGage"
        :key="index"
        :value="String(g.gauge.id)"
      >
        {{ g.gauge.name }}
      </cv-select-option>
    </cv-select>

    <template v-if="formData.gauge_id">
      <div class="bx--row">
        <cv-number-input
          v-model="formData.reading"
          label="Flow"
          class="mb-spacing-md bx--col-sm-12 bx--col-md-4"
        />
        <div v-if="formData.gauge_id" class="bx--col-sm-12 bx--col-md-4">
          <cv-select v-model="formData.metric_id" label="Gage Metric">
            <cv-select-option
              v-for="(g, index) in metricOptions"
              :key="index"
              :value="String(g.id)"
            >
              {{ g.label }}
            </cv-select-option>
          </cv-select>
        </div>
      </div>
    </template>

    <cv-select
      v-model="formData.observation"
      label="Describe the flow"
      class="mb-spacing-md"
    >
      <cv-select-option value="">Choose an option</cv-select-option>
      <cv-select-option
        v-for="(v, index) in Object.keys(observationEnum)"
        :key="index"
        :value="v"
        >{{ observationEnum[v] }}</cv-select-option
      >
    </cv-select>
    <flow-range-help-modal />

    <div class="mb-spacing-md cv-text-area bx--form-item">
      <label class="bx--label">Report Detail</label>
      <content-editor
        :content="!formData.detail ? ' ' : formData.detail"
        show-control-bar
        @content:updated="formData.detail = $event"
      />
    </div>

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
import {
  MultiPhotoUploader,
  ContentEditor,
  FlowRangeHelpModal,
} from "@/app/global/components";
import { mapState } from "vuex";
import { gaugeHelpers } from "@/app/global/mixins";
import { updatePost } from "@/app/services";
import moment from "moment";

export default {
  name: "report-form",
  components: {
    MultiPhotoUploader,
    ContentEditor,
    FlowRangeHelpModal,
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
        observation: null,
        metric_id: "1",
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
      gages: (state) => state.RiverGages.data?.gauges ?? [],
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
    gagesWithGage() {
      return (this.gages?.filter((x) => x.gauge) ?? []).sort((a, b) => {
        //sort by primary over secondary
        if (a.delay_update - b.delay_update) {
          return a.delay_update - b.delay_update;
          // sort by updated last
        } else {
          return a.epoch - b.epoch;
        }
      });
    },
    availableGageIds() {
      return this.gagesWithGage.map(x => x.gauge.id);
    }
  },
  methods: {
    changeGauge(newVal, oldVal) {
      // if switching between gauges, do nothing
      // if switching from gauge to no gauge or vice versa,
      // update reading and metric_id accordingly
      if (newVal && (!oldVal || oldVal === undefined)) {
        this.formData.reading = "";
        const selectedGage = this.gages.find((x) => x.gauge.id === newVal);
        this.formData.metric_id = `${selectedGage?.gauge_metric}`;
      } else if (!newVal) {
        // ensure metric_id is set properly whenever there is no gauge
        this.formData.metric_id = "1";
        if (oldVal) {
          // revert reading to empty if we just changed from gauge to no gauge
          this.formData.reading = "";
        }
      }
    },
    processFormData() {
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
      ["metric_id", "gauge_id", "observation", "reading"].forEach((field) => {
        if (this.formData[field] === "" || this.formData[field] === "undefined") {
          this.formData[field] = null;
        }
      });
    },
    async handleSubmit() {
      this.formPending = true;

      this.processFormData();

      try {
        const result = await updatePost(this.formData);
        // graphql doesn't accept embedded photo data, so the multi-photo
        // upload component iterates through each one with new requests
        await this.$refs.multiPhotoUploader.submitImages();
        this.formPending = false;

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Success",
            subtitle: "Report saved.",
          });
          this.$store.dispatch("RiverReports/getProperty", {
            id: this.$route.params.id,
          });

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
        } else if (key === "gauge_id") {
          // there are some situations where reports are associated with gauges that are no
          // longer associated with the reach. That causes problems with the form
          // because the dropdown doesn't display that gauge. Ensure we avoid that situation
          if (this.availableGageIds.includes(this.report.gauge?.id)) {
            this.formData[key] = this.report.gauge?.id;
          }
        } else if (key === "metric_id") {
          this.formData[key] = this.report.metric?.id;
        } else {
          this.formData[key] = this.report[key];
        }

        // avoid cv-select throwing a warning about putting a number in a string value
        if (this.formData.observation) {
          this.formData.observation = `${this.formData.observation}`;
        }
      });
    }
  },
};
</script>
<style lang="scss">
.report-form {
  .bx--select-input {
    width: 100%;
  }
}
</style>
