<template>
  <div :class="[{ visible: visible }, 'alert-update-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      @modal-shown="setModalOffset"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
    >
      <template slot="title">
        {{ modalTitle }}
      </template>
      <template slot="content">
        <cv-text-input
          ref="title"
          v-model="formData.title"
          class="mb-spacing-md"
          label="Title"
          :disabled="formPending"
        />
        <cv-text-area
          v-model="formData.detail"
          label="Message"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
      <template slot="secondary-button"> Cancel </template>
      <template
        slot="primary-button"
        @click.exact="submitAlert"
        @keydown.enter="submitAlert"
      >
        Submit
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { shadowDomFixedHeightOffset } from "@/app/global/mixins";
import { updatePost } from "@/app/services";

import { mapState } from "vuex";
export default {
  name: "alert-update-modal",
  mixins: [shadowDomFixedHeightOffset],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    alertId: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    formData: {
      id: this.$randomId(),
      user_id: null,
      detail: null,
      post_date: null,
      post_type: "WARNING",
      reach_id: null,
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      alerts: (state) => state.RiverAlerts.data,
    }),
    activeAlert() {
      if (this.alertId) {
        return this.alerts.find((a) => a.id === this.alertId);
      }
      return null;
    },
  },
  methods: {
    setFormData() {
      const today = new Date();
      this.formData.post.post_date = today.toISOString();

      if (this.alertId) {
        this.formData.id = this.alertId;
        this.formData.title = this.activeAlert.title;
        this.formData.detail = this.activeAlert.detail;
      }
    },
    handleCancel() {
      this.$emit("update:cancelled");
    },
    async submitAlert() {
      if (this.user) {
        this.formData.user_id = this.user.uid;

        this.$emit("update:submitted");
        try {
          this.formData.detail = "";
          this.formData.title = "";

          const result = await updatePost(this.formData);
          if (!result.errors) {
            this.$store.dispatch("Global/sendToast", {
              title: "Alert Submitted",
              kind: "success",
              override: true,
              contrast: false,
              action: false,
              autoHide: true,
            });
            this.$store.dispatch(
              "RiverAlerts/getProperty",
              this.$route.params.id
            );
          } else {
            this.handleError(result.errors);
          }
        } catch (error) {
          this.handleError(error);
        }
      }
    },
    handleError(errors) {
      this.$store.dispatch("Global/sendToast", {
        kind: "error",
        title: "Error",
        subtitle:
          "Failed to save alert: " +
          Object.keys(errors)
            .map((x) => errors[x]?.message ?? "")
            .join(","),
      });
    },
  },
  mounted() {
    this.setFormData();
  },
};
</script>
