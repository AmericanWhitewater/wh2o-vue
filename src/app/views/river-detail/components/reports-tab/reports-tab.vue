<template>
  <div class="reports-tab mb-xl">
    <cv-button
      class="mb-sm"
      @click.exact="$refs.postUpdateModal.open()"
      @keydown.enter="$refs.postUpdateModal.open()"
    >
      New Trip Report
    </cv-button>
    <template v-if="loading && !data">
      <utility-block :state="loading" />
    </template>
    <template v-else-if="data">
      <report
        v-for="(item, index) in data"
        :key="index"
        :data="item"
        @report:delete="load(reachId)"
      />
    </template>
    <template v-else> something went wrong </template>
    <post-update-modal
      ref="postUpdateModal"
      title="New Trip Report"
      kind="JOURNAL"
      :reachId="reachId"
      @update:success="load(reachId)"
    >
      <template #form-fields="formData">
        <cv-text-input
          v-model="formData.formData.post.title"
          label="Title"
          theme="light"
          class="mb-spacing-md"
        />
        <cv-text-area
          v-model="formData.formData.post.detail"
          label="Description"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
    </post-update-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Report from "./components/report";
import { PostUpdateModal, UtilityBlock } from "@/app/global/components";
export default {
  name: "reports-tab",
  components: {
    Report,
    PostUpdateModal,
    UtilityBlock,
  },
  computed: {
    ...mapState({
      data: (state) => state.RiverReports.data,
      loading: (state) => state.RiverReports.loading,
      refId: (state) => state.RiverReports.refId,
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      load: "RiverReports/getProperty",
      setRefId: "RiverReports/setRefId",
    }),
  },
  created() {
    if (!this.data || this.refId !== this.reachId) {
      this.load(this.reachId);
      this.setRefId(this.reachId);
    }
  },
};
</script>
