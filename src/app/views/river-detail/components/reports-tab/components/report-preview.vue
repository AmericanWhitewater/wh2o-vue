<template>
  <div
    v-if="report.detail"
    class="mb-sm report-preview bx--tile"
    @click="displayReport(report)"
  >
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-1">
        <user-avatar theme="light" :user="report.user" />
      </div>
      <div class="bx--col-sm-12 bx--col-md-3">
        <h5 class="mr-spacing-sm" v-text="report.user.uname" />
        <h6
          class="date mb-spacing-xs"
          v-text="formatDate(report.post_date, 'll')"
        />
        <hr v-if="!editMode" >
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
          <hr v-if="editMode" >
        </template>
      </div>
      <div
        v-if="report.photos && report.photos[0]"
        class="bx--col-sm-12 bx--col-md-3 inside thumbnail pb-spacing-sm"
      >
        <img
          :src="imageURI(report.photos[0], 'medium')"
          :alt="report.photos[0].caption"
        >
      </div>
    </div>
  </div>
</template>
<script>
import UserAvatar from "@/app/global/components/user-avatar/user-avatar";
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
} from "@/app/global/mixins";
export default {
  name: "report-preview",
  components: {
    UserAvatar,
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
  },
  methods: {
    displayReport() {
      //console.log("navigating to report detail");
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
}
</style>
