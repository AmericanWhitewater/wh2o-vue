<template>
  <cv-modal
    ref="modalWrapper"
    size="medium"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
    @modal-shown="setModalOffset"
  >
    <template slot="title"> Specify revision comment </template>
    <template slot="content">
      <cv-text-area
        v-model="revisionComment"
        label="Revision comment"
        theme="light"
        class="mb-spacing-md short-text-area"
      />
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { shadowDomFixedHeightOffset, assetUrl } from "@/app/global/mixins";

// modal open/close modelled on https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/
export default {
  name: "edit-revision-modal",
  mixins: [shadowDomFixedHeightOffset, assetUrl],
  data: () => ({
    resolvePromise: undefined,
    rejectPromise: undefined,
    revisionComment: null,
  }),
  computed: {
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    show(opts) {
      this.$refs.modalWrapper.show();

      if (opts.version) {
        this.revisionComment = opts.version.revision_comment;
      }

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm() {
      this.resolvePromise(this.revisionComment);
      this.$refs.modalWrapper.hide();
    },
    _cancel() {
      this.resolvePromise(false);
    },
  },
};
</script>

<style lang="scss">
.credits-tab .short-text-area .bx--text-area__wrapper {
  height: 8rem;
}
</style>