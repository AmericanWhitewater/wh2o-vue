<template>
  <div
    id="utility-block"
    :style="`height:${height}px`"
    :class="[`utility-block-${state}`, theme]"
  >
    <template v-if="!blank">
      <h2
        v-if="title"
        class="utility-block-title"
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
    },
    theme: {
      type: String,
      required: false,
      default: 'light',
      validator: value =>
        ['light', 'dark'].indexOf(value) !== -1
    }
  }
}
</script>
