<template>
  <component
    :is="name"
    :options="options"
  >
    <slot
      v-for="(_, item) in $slots"
      :slot="item"
      :name="item"
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
    /**
     * @values layout-two-thirds, layout-full-width, layout-fifty-fifty
     */
    name: {
      type: String,
      required: true
    },
    /**
     * set layout specific options like side bar on the left side or no advertisements.
     */
    options: {
      type: Object,
      required: false
    }
  }
}
</script>
<docs>
# Layout

The layout component provides a reusable standardized layout template which leverages the power to named slots.
This component helps keep our templates clean by handling all of the carbon design system, `bx--grid`, `bx--row`, and `bx--col`
declarations in one place.

For example, trying to keep track of sidebar col classes, `bx--col-sm-4 bx--col-md-6 bx--col-lg-5 bx--offset-lg-1` , and maintain consistency across all components, routes, layouts, etc. can be very challenging.

## Example

The following is an example of a complex layout using this component:

```
  <div class="main-tab">
    <layout name="layout-fifty-fifty" class="mb-lg">
      <template #left>
        <beta-box />
      </template>
      <template #right>
        <loading-block :hide-text="true" />
      </template>
    </layout>
    <layout name="layout-two-thirds" class="mb-lg">
      <template #main>
        <river-description />
      </template>
      <template #sidebar>
        <side-bar />
      </template>
    </layout>
    <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <rapids-section />
      </template>
    </layout>
  </div>

  ```

  ## Named Slot Documentation

  [https://vuejs.org/v2/guide/components-slots.html#Named-Slots](https://vuejs.org/v2/guide/components-slots.html#Named-Slots)

</docs>
