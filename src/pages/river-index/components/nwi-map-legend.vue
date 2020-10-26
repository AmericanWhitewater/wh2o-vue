<template>
  <div class="nwi-legend">
    <h5 class="bx--type-zeta">
      {{ colorByTitle }}
    </h5>
    <div
      v-for="(color, label) in colorScheme"
      :key="color"
      class="bx--type-caption"
    >
      <span :style="`background-color: ${color}`" />
      {{ label }}
    </div>
  </div>
</template>

<script>
import MapStyles from './nwi-map-styles'

export default {
  name: 'nwi-map-legend',
  props: {
    colorBy: {
      type: String,
      required: true
    }
  },
  computed: {
    colorScheme () {
      return MapStyles.colorSchemes[this.colorBy]
    },
    // this feels sort of silly but alternative is to write some kind of titlecase-ish
    // method that is way more complex than this. If we add more color schemes it's something
    // to consider.
    colorByTitle () {
      if (this.colorBy === 'currentFlow') {
        return 'Current Flow'
      }
      return 'Difficulty'
    }
  }
}
</script>

<style scoped lang="scss">
.nwi-legend {
  background-color: #fff;
  border-radius: 3px;
  top: 0.5rem;
  left: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: absolute;
  z-index: 1;

  display: none;

  // @include carbon--breakpoint('md') {
  //   display: block;
  // }

  h5 {
    margin: 0 0 10px;
  }

  div {
    span {
      // border-radius: 50%;
      display: inline-block;
      height: 1rem;
      margin-right: 0.5rem;
      width: 1rem;
      text-align: left;
    }
  }
}
</style>
