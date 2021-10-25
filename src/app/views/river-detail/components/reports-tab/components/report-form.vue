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
    <cv-text-area
      v-model="formData.detail"
      label="Description"
      theme="light"
      class="mb-spacing-md"
    />
    <cv-button-set>
      <cv-button @click.exact="handleSubmit" @keydown.enter="handleSubmit">
        Submit
      </cv-button>
    </cv-button-set>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { updatePost } from "@/app/services";
import moment from "moment";

export default {
  name: "report-form",
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
        metric_id: null,
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