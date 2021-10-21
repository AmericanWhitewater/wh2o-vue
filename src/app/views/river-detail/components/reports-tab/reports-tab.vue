<template>
  <div class="reports-tab">
    <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <hr >
        <h2 class="mb-spacing-md">Trip Reports</h2>
        <template v-if="loading && !reports">
          <utility-block
            class="reports-loading"
            state="loading"
            text="loading reports"
          />
        </template>
        <template v-else-if="reports">
          <report-preview
            v-for="(item, index) in reports"
            :key="index"
            :report="item"
          />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { Layout } from "@/app/global/layout";
import { ReportPreview } from "./components";
export default {
  name: "reports-tab",
  components: {
    Layout,
    UtilityBlock,
    ReportPreview,
  },
  mixins: [objectPermissionsHelpersMixin],
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
      reports: (state) => state.RiverReports.data,
      loading: (state) => state.RiverReports.loading,
    }),
  },
  methods: {},
  created() {
    if (!this.reports) {
      this.$store.dispatch("RiverReports/getProperty", this.$route.params.id);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
