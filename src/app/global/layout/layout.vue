<template>
  <component :is="name">
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
  </component>
</template>

<script>
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from './layouts'
export default {
  name: 'Layout',
  components: {
    LayoutTwoThirds,
    LayoutFullWidth,
    LayoutFiftyFifty
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
