<template>
  <div
    id="loading-block"
    :style="`height:${height}px`"
  >
    <cv-inline-loading
      small
      state="loading"
      :loading-text="text"
    />
  </div>
</template>
<script>
/**
 * @displayName Loading Block
 */
export default {
  name: 'LoadingBlock',
  props: {
    height: {
      type: String,
      default: '350'
    },
    text: {
      type: String,
      default: 'Loading Data...'
    }
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
  }
}
</style>
<docs>

```js
<loading-block />
```

</docs>
