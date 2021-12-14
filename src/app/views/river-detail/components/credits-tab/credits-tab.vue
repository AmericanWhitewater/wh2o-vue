<template>
  <div class="credits-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" text="Loading Credits..." />
        </template>
        <template v-else-if="credits">
          <div
            v-for="version in credits"
            :key="version.revision"
            class="bx--tile mb-sm"
          >
            <div class="bx--row">
              <div class="bx--col">
                <cv-button
                  v-if="canEdit(version)"
                  size="small"
                  kind="secondary"
                  class="revision-edit"
                  @click.exact="triggerEditRevision(version)"
                  @keydown.enter="triggerEditRevision(version)"
                >
                  Edit revision comment
                </cv-button>
                <h5>Revision Date: {{ formatDate(version.edited) }}</h5>
                <h5>Edited By: {{ version.sk && version.sk.name }}</h5>
                <p>Revision Comment: {{ version.revision_comment }}</p>
              </div>
            </div>
          </div>
          <edit-revision-modal ref="editRevisionModal" />
        </template>
        <template v-else>
          <utility-block
            state="error"
            title="Credits unavailable"
            text="please try again later"
          />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import EditRevisionModal from "./components/edit-revision-modal";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { Layout } from "@/app/global/layout";
export default {
  name: "credits-tab",
  components: {
    UtilityBlock,
    Layout,
    EditRevisionModal,
  },
  mixins: [objectPermissionsHelpersMixin],
  computed: {
    ...mapState({
      loading: (state) => state.RiverCredits.loading,
      error: (state) => state.RiverCredits.error,
      credits: (state) => state.RiverCredits.data,
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    loadData() {
      this.$store.dispatch("RiverCredits/getProperty", this.reachId);
    },
    async triggerEditRevision(version) {
      const newRevisionComment = await this.$refs.editRevisionModal.show({
        version: version,
      });
      if (newRevisionComment && version) {
        await this.$store.dispatch("RiverCredits/updateProperty", {
          id: this.reachId,
          comment: newRevisionComment,
          revision: version.revision,
        });
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss">
.revision-edit {
  float: right;
  padding: 0.375rem 0.5rem;
}
</style>