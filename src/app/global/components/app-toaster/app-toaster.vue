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
                  :low-contrast="t.contrast"
                  :action-label="t.label"
                  @action="refreshApp"
                  @close="handleClose(index)"
                />
              </template>
              <template v-else>
                <cv-toast-notification
                  :kind="t.kind"
                  :title="t.title"
                  :sub-title="t.subtitle"
                  :low-contrast="t.contrast"
                  @close="handleClose(index, t.title)"
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
import { appLocalStorage } from "@/app/global/services";
export default {
  name: "AppToaster",
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    newUpdate: {
      title: "App Update Available",
      label: "Install",
      kind: "info",
      contrast: true,
      action: true
    },
    vueDevTools: {
      title: "Vue Dev Tools Available",
      subtitle: "Get a peek under the hood.",
      kind: "info",
      contrast: false,
      action: false
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
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  mounted() {
    this.showDevToolsToast();
  },
  methods: {
    handleClose(index, title) {
      if (index === 0) {
        this.toasts.shift();
      }
      if (index === 1) {
        this.toasts.pop();
      }
      if (title === this.vueDevTools.title) {
        appLocalStorage.setItem("Vue_Toast_Dismissed", true);
      }
    },
    handleUpdate() {
      window.location.reload(true);
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
    showDevToolsToast() {
      if (!appLocalStorage.getItem("Vue_Toast_Dismissed")) {
        this.toasts.push(this.vueDevTools);
      }
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
