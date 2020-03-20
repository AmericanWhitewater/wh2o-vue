<template>
  <div
    id="error-block"
    :style="`height:${height}px`"
  >
    <cv-inline-loading
      small
      state="error"
      :loading-text="hideText ? '' : text"
    />
  </div>
</template>
<script>
/**
 * @todo refactor loading-block, error-block, skeleton-block into one component
 * @deprecated
 */

export default {
  name: 'error-block',
  props: {
    height: {
      type: String,
      default: '350'
    },
    text: {
      type: String,
      default: 'failed to load data'
    },
    hideText: {
      type: Boolean,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
#error-block {
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
<error-block />
```

</docs>
