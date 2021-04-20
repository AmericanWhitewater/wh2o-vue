<template>
  <cv-modal
    ref="modalWrapper"
    size="small"
    kind="danger"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
    @modal-shown="setModalOffset"
  >
    <template slot="title">
      <h2>
        {{ title }}
      </h2>
    </template>
    <template slot="content">
      <p class="mb-sm">{{ message }}</p>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { shadowDomFixedHeightOffset } from "@/app/global/mixins";

// modelled on https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/
export default {
  name: "confirm-delete-modal",
  mixins: [shadowDomFixedHeightOffset],
  data: () => ({
    title: undefined,
    message: undefined,
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),
  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.$refs.modalWrapper.show();

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm() {
      this.resolvePromise(true);
      this.$refs.modalWrapper.hide();
    },
    _cancel() {
      this.resolvePromise(false);
    },
  },
};
</script>
