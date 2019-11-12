<docs>

this is a temp solution. as more toasts are added, then the page will get blocked.

need to set width auto, and match bx--grid right positioning.

</docs>

<template>
  <div class="app-toaster">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <transition-group name="list" tag="ul">
            <li v-for="(t, index) in toasts" :key="t.title">
              <template v-if="t.action">
                <cv-inline-notification
                  ref="toast"
                  :kind="t.kind"
                  :title="t.title"
                  :low-contrast="t.lowContrast"
                  @close="handleClose(index)"
                />
              </template>
              <template v-else>
                <cv-toast-notification
                  v-if="t.toast"
                  :kind="t.kind"
                  :title="t.title"
                  :sub-title="t.subtitle"
                  :low-contrast="t.lowContrast"
                  @close="handleClose(index)"
                />
              </template>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  name: "AppToaster",
  data: () => ({
    newUpdate: {
      title: "App Update Available",
      actionLabel: "Install",
      kind: "info",
      lowContrast: false,
      action: true
    },
    toasts: []
  }),
  computed: {
    updateAvailable() {
      return this.$store.state.appGlobalState.appGlobalData.updateAvailable;
    }
  },
  watch: {
    updateAvailable() {
      this.toasts.push(this.newUpdate);
    }
  },
  mounted() {
    this.toasts.push(this.newUpdate);
  },
  methods: {
    handleClose(index) {
      if (index === 0) {
        this.toasts.shift();
      }
      if (index === 1) {
        this.toasts.pop();
      }
    },
    handleUpdate() {
      console.log("user initiated update");
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
  top: 50px;
  width: 100vw;
  z-index: 9999;

  @include MQ("LG") {
    top: 75px;
  }
  &.hidden {
    display: none;
    visibility: hidden;
  }

  .bx--col {
    display: flex;
    justify-content: flex-end;
  }
}

.list-enter-active,
.list-leave-active {
  @include ease(0.4s);
}
.list-enter,
.list-leave-to {
  transform: translateX(150%);
}
</style>
