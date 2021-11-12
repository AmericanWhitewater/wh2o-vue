<template>
  <div
    v-if="report"
    class="mb-sm report-preview bx--tile"
    @click="displayReport(report)"
  >
    <div class="bx--row">
      <div class="bx--col-sm-4 bx--col-md-5">
        <div class="bx--row mb-sm">
          <div class="bx--col-sm-2 bx--col-md-2">
            <user-avatar theme="light" :user="report.user" />
          </div>
          <div class="bx--col-sm-2 bx--col-md-6">
            <h5 class="mr-spacing-sm">
              {{ report.user.uname }} - {{ report.title }}
            </h5>
            <h6
              class="date mb-spacing-xs"
              v-text="formatDate(report.post_date, 'll')"
            />
            <hr v-if="!editMode">
            <template v-if="editMode">
              <cv-button
                v-if="canEdit(report)"
                size="small"
                kind="secondary"
                @click.exact="$emit('report:edit', report)"
                @keydown.enter="$emit('report:edit', report)"
              >
                Edit
              </cv-button>
              <hr v-if="editMode">
            </template>
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--col-sm-4" v-html="reportPreview" />
        </div>
      </div>
      <div class="bx--col-sm-4 bx--col-md-3 report-thumbnail">
        <template v-if="report.photos && report.photos[0]">
          <img
            :src="imageURI(report.photos[0], 'thumb')"
            :alt="report.photos[0].caption"
          >
        </template>
        <template v-else>
          <utility-block state="content" theme="dark" text="No images" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { UserAvatar, UtilityBlock } from "@/app/global/components";

import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
} from "@/app/global/mixins";
export default {
  name: "report-preview",
  components: {
    UserAvatar,
    UtilityBlock,
  },
  mixins: [shadowDomFixedHeightOffset, objectPermissionsHelpersMixin],
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    editMode() {
      return this.$store.state.Global.editMode;
    },
    user() {
      return this.$store.state.User.data;
    },
    reachId() {
      return this.$route.params.id;
    },
    reportPreview() {
      // truncate to first 100 words
      let output = this.report.detail.split(" ").splice(0, 99).join(" ");
      if (this.report.detail.length > output.length) {
        output += "...";
      }
      return output;
    },
  },
  methods: {
    displayReport(report) {
      this.$router.push({
        name: "report-detail",
        params: { reportId: report.id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.report-preview {
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }

  .report-thumbnail {
    justify-content: right;
    display: flex;

    #utility-block {
      min-height: unset;
    }
  }
}
</style>
