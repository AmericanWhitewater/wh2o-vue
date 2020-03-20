<template>
  <div
    id="loading-block"
    :style="`height:${height}px`"
  >
    <cv-inline-loading
      small
      state="loading"
      :loading-text="hideText ? '' : text"
    />
  </div>
</template>
<script>
/**
 * @deprecated
 * @displayName Loading Block
 * @todo refactor loading-block, error-block, skeleton-block into one component
 */
export default {
  name: 'loading-block',
  props: {
    height: {
      type: String,
      default: '350'
    },
    text: {
      type: String,
      default: 'Loading Data...'
    },
    hideText: {
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
#loading-block {
  background-color: $ui-02;
  display: flex;
  width: 100%;

  align-items: center;
  .bx--inline-loading {
    justify-content: center;
     @include carbon--type-style('code-01');
  }
}
</style>
<docs>

```js
<loading-block />
```

</docs>
