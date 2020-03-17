<template>
  <div
    id="utility-block"
    :style="`height:${height}px`"
  >
    <slot name="content">
      <cv-inline-loading
        small
        :state="state"
        :loading-text="hideText ? '' : text"
      />
    </slot>
  </div>
</template>
<script>
/**
 * @displayName Utility Block
 */
export default {
  name: 'utility-block',
  props: {
    height: {
      type: String,
      default: '350'
    },
    text: {
      type: String,
      default: 'loading data...'
    },
    hideText: {
      type: Boolean,
      required: false
    },
    state: {
      type: String,
      required: false,
      validator: value => ['loading', 'error', 'complete'].indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>
#utility-block {
  background-color: $ui-02;
  display: flex;
  width: 100%;

  align-items: center;
  .bx--inline-loading {
    justify-content: center;
    @include carbon--type-style("code-01");
  }
}
</style>
<docs>

```js
<utility-block />
```

</docs>
