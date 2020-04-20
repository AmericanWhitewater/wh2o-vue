<template>
  <div
    v-if="!dismissed"
    class="app-cookie-banner"
  >
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <div class="contents">
            <div>
              This app uses cookies. To learn more about our privacy policy, consult the <router-link to="/terms-of-service">
                Terms of
                Service
              </router-link>.
            </div>

            <cv-button
              id="close"
              size="small"
              kind="tertiary"
              @click.exact="dismissWarning"
              @keydown.enter="dismissWarning"
            >
              Close
            </cv-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { appLocalStorage } from '@/app/global/services'
export default {
  name: 'app-cookie-banner',
  data: () => ({
    dismissed: false
  }),
  methods: {
    dismissWarning () {
      appLocalStorage.setItem('wh2o-cookie-warning-dismssed', true)
      this.dismissed = true
    }
  },
  created () {
    if (appLocalStorage.getItem('wh2o-cookie-warning-dismssed')) {
      this.dismissed = true
    }
  }
}
</script>
<style lang="scss" scoped>
.app-cookie-banner {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background-color: $ui-03;
  z-index: 9999;

  .contents {
    width: 100%;
    min-height: 50px;
    align-items: center;
    display: flex;
    justify-content: center;
    @include carbon--type-style("body-short-01");
    @include carbon--breakpoint('sm') {
      padding: $spacing-xs 0;
    }

    div {
      flex:1;
    }
  }
}
</style>
<docs>

</docs>
