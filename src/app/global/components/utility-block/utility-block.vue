<template>
  <div
    id="utility-block"
    :style="`height:${height}px`"
    :class="`utility-block-${state}`"
  >
    <template v-if="!blank">
      <h2
        v-if="title"
        class="utility-block-title mb-spacing-md"
        v-text="title"
      />
      <p
        v-if="text && state === 'content'"
        class="utility-block-text mb-spacing-md"
        v-text="text"
      />
    </template>
    <div>
      <cv-inline-loading
        v-if="state !== 'content' && !blank && !title"
        small
        :state="state"
        :loading-text="hideText ? '' : text"
        :error-text="hideText ? '' : text"
      />
      <slot />
    </div>
  </div>
</template>
<script>
/**
 * @displayName Utility Block
 */
export default {
  name: 'utility-block',
  props: {
    blank: {
      type: Boolean,
      required: false
    },
    height: {
      type: String,
      default: '350'
    },
    text: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    hideText: {
      type: Boolean,
      required: false
    },
    state: {
      type: String,
      required: false,
      validator: value =>
        ['loading', 'error', 'complete', 'content'].indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>
#utility-block {
  background-color: $ui-02;
  display: flex;
  width: 100%;
  min-height: 250px;
  height: 100%;
  padding: $spacing-md;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
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
