<template>
  <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-16 mb-sm reach-detail">
    <cv-tile
      kind="standard"
      cv-type="standard"
    >
      <div class="top-bar">
        <div class="title mb-spacing-xs">
          <h4 class="mb-spacing-xs">
            <a :href="reachURL">{{ reach.river }} - {{ reach.section }}</a>
          </h4>
          <span
            v-if="reach.class"
            class="mr-spacing-md rapid-meta"
            v-text="`Class: ${reach.class}`"
          />

          <hr class="ui-03">

          <div class="aw-rapid-info aw-rapid-description bx--col-sm-12">
            <p
              v-if="reach.abstract"
              v-html="reach.abstract"
            />
            <p
              v-else
              class="description-unavailable"
            >
              Description unavailable.
            </p>
          </div>
        </div>
      </div>
    </cv-tile>
  </div>
</template>

<script>
export default {
  name: 'reach-detail',
  props: {
    reach: {
      type: Object,
      required: true
    }
  },
  computed: {
    reachURL () {
      return `/#/river-detail/${this.reach.id}/main`
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  text-transform: capitalize;
  padding: 0 0 0.75rem 0;
}
</style>
