<template>
  <div>
    <hr >
    <h2 class="mb-spacing-md">Trip Reports</h2>
    <cv-breadcrumb no-trailing-slash>
      <cv-breadcrumb-item>
        <cv-link :to="{ name: 'reports-tab' }"> Trip Reports </cv-link>
      </cv-breadcrumb-item>
      <cv-breadcrumb-item>
        <cv-link href=""> Add New Trip Report </cv-link>
      </cv-breadcrumb-item>
    </cv-breadcrumb>
    <hr >

    <report-form />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ReportForm from "./report-form";

export default {
  name: "new-report",
  components: {
    ReportForm,
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data,
    }),
  },
};
</script>
<style lang="scss" scoped>
</style>
