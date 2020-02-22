<template>
  <component :is="name">
    <!-- <slot name="main" />
        <slot name="sidebar" /> -->
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
  </component>
</template>

<script>
import { LayoutTwoThirds, LayoutFullWidth } from './layouts'
export default {
  name: 'Layout',
  components: {
    LayoutTwoThirds,
    LayoutFullWidth
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
