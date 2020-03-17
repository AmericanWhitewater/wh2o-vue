<template>
  <div
    class="error-block"
    :style="`height:${height}px`"
  >
    <error-outlined v-if="!hideIcon" />
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
</template>
<script>
/**
 * @todo refactor loading-block, error-block, skeleton-block into one component
 * @deprecated
 */
import error_outlined32 from '@carbon/icons-vue/es/error--outline/32'

export default {
  name: 'error-block',
  components: {
    'error-outlined': error_outlined32
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'error'
    },
    text: {
      type: String,
      required: false,
      default: 'Something went wrong'
    },
    height: {
      type: String,
      default: '350'
    },
    hideIcon: {
      type: Boolean,
      required: false
    }
  },
  created () {
    const msg = 'this component is deprecated in favor of the <utility-block />'
    // eslint-disable-next-line no-console
    console.log('%cWarning', 'background: yellow; color: black; padding: 2px 4px; border-radius: 3px; font-weight: bold;', msg)
  }
}
</script>
<style lang="scss" scoped>
.error-block {
  width: 100%;
  background-color: $ui-02;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  flex-flow: column nowrap;
}
</style>
<docs>

```js
<error-block />
```

</docs>
