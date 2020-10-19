<template>
  <div class="app-toaster">
    <div class="bx--grid">
      <div class="bx--row bx--no-gutter--left">
        <div class="bx--col">
          <transition-group
            name="list"
            tag="ul"
          >
            <li
              v-for="(t, index) in toasts"
              :key="randomId(index)"
            >
              <template v-if="t.action">
                <cv-inline-notification
                  ref="toast"
                  :kind="t.kind"
                  :title="t.title"
                  :low-contrast="t.contrast"
                  :action-label="t.label"
                  :sub-title="t.subtitle"
                  @action="handleAction(index, t.href)"
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
import { mapState } from 'vuex'
import { globalAppActions } from '@/app/global/state'
/**
 * @displayName App Toaster
 */
export default {
  name: 'app-toaster',
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    newUpdate: {
      title: 'App Update Available',
      label: 'Install',
      kind: 'info',
      contrast: true,
      action: true
    }
  }),
  computed: {
    ...mapState({
      updateAvailable: state =>
        state.appGlobalState.appGlobalData.updateAvailable,
      toasts: state => state.appGlobalState.appGlobalData.toasts
    })
  },
  watch: {
    toasts () {
      /**
       * @note this is not a permanent solution for auto hide
       */
      setTimeout(() => {
        this.$store.dispatch(globalAppActions.CLOSE_TOAST, 0)
      }, 5000)
    },
    updateAvailable (update) {
      if (update) {
        this.$store.dispatch(globalAppActions.SEND_TOAST, this.newUpdate)
      }
    }
  },
  methods: {
    randomId () {
      /**
       * linter requires this to take an argument?
       */
      return this.$randomId()
    },
    handleClose (index, title) {
      this.$store.dispatch(globalAppActions.CLOSE_TOAST, index)
    },
    handleUpdate () {
      window.location.reload(true)
    },
    showRefreshUI (e) {
      this.registration = e.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage('skipWaiting')
    },
    handleAction (index, href) {
      if (href) {
        this.$router.push(href)
      } else {
        this.refreshApp()
      }
      this.$store.dispatch(globalAppActions.CLOSE_TOAST, index)
    }
  },
  created () {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  }
}
</script>
<style lang="scss" scoped>
.bx--toast-notification {
  margin-right: 0;
}
.app-toaster {
  position: fixed;
  top: 50px;
  width: 100vw;
  right: 0;
  z-index: 9999;
  margin: 0;
  overflow: visible;

  @include carbon--breakpoint("lg") {
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
<docs>

this is a temp solution. as more toasts are added, then the page will get blocked.

need to set width auto, and match bx--grid right positioning.

```js

<app-toaster />
```

</docs>
