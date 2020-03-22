<template>
  <div>
    <feature-card-hero />
  </div>
</template>
<script>
import { FeatureCardHero } from './components'

export default {
  name: 'home-page',
  components: {
    FeatureCardHero
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
