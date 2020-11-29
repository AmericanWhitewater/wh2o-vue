<template>
  <div class='store bx--grid'>
    <div class="bx--row">
      <div class="bx--col">
        <template v-if="offline">
           <utility-block theme="dark" hide-text state="content" text="Sorry. The requested page is not available offline." />
        </template>
        <template v-else>
          <template v-if="!loaded">
            <utility-block theme="dark" hide-text state="loading" />
          </template>
          <div class="iframe-wrapper">
            <iframe v-show="loaded" class="iframe" :src="url" @load="loaded = true" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {UtilityBlock} from "@/app/global/components"

export default {
  name: "legacy-viewer",
  components: {
    UtilityBlock
  },
  data: () => ({
    loaded: false,
    warningVisible: false
  }),
  metaInfo: {
    title: 'Legacy App',
    titleTemplate: '%s - American Whitewater'
  },
  computed: {
    url() {
      return this.$route.query.url
    },
    offline () {
      return this.$store.state.Global.offline
    }
  },
  watch: {
    url(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.loaded = false
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.iframe-wrapper {
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .iframe {
    flex: 1 1 0;
  }
}
</style>
