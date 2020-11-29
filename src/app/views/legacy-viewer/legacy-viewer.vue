<template>
  <div class='store bx--grid'>
    <div class="bx--row">
      <div class="bx--col">
        <template v-if="!loaded">
          <utility-block theme="dark" hide-text state="loading" />
        </template>
        <div class="iframe-wrapper">
          <iframe v-show="loaded" class="iframe" :src="url" @load="loaded = true" />
        </div>
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
  }),
  computed: {
    url() {
      return this.$route.query.url
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
