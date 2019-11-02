<template>
  <div :class="[{ hidden: !visible }, 'app-toaster']">
    <cv-toast-notification
      v-if="visible"
      :kind="toastKind"
      title="Your membership is about to expire"
      sub-title="visit account settings to renew"
      @close="handleClose"
    />
  </div>
</template>
<script>
export default {
  name: "AppToaster",
  data: () => {
    return {
      visible: true,
      toastKind: "warning"
    };
  },
  computed: {
    user() {
      //   use this to gather info about the user
      return null;
    },
    warning() {
      // if the user membership is 1 month from expiration
      // this.toastKind = 'warning'
      //
      // for membership warnings, consider storing a cookie, or making a note that the user has dismissed notification.
      // we might not want to show everything they start a new session.
      return null;
    },
    error() {
      // if the user membership is 7 days from expiration
      // or if there is an urgent legistlative action
      // if both are true, then urgent legislative content wins.
      // be wary of showing multiple toasts.
      // this.toastKind = 'error'
      return null;
    },
    info() {
      // if there is an general announcement
      // this.toastKind = 'info'
      return null;
    }
  },
  mounted() {
    // this.visible = true;
    // turn off while testing other components
    this.visible = false;
  },
  methods: {
    handleClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.bx--toast-notification {
  margin-right: 0;
}
.app-toaster {
  position: fixed;
  z-index: 9999;
  right: 0;
  top: 50px;
  padding-right: 2rem;

  @include MQ("LG") {
    top: 75px;
  }
  &.hidden {
    display: none;
  }
}
</style>
