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
        class="utility-block-text"
        v-text="text"
      />
    </template>
    <div>
      <!-- <cv-inline-loading
        v-if="state !== 'content' && !blank && !title"
        small
        :state="state"
        :loading-text="hideText ? '' : text"
        :error-text="hideText ? '' : text"
      /> -->
      loading...
      <slot />
    </div>
  </div>
</template>
<script>

export default {
  name: 'UtilityBlock',
  props: {
    blank: {
      type: Boolean,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    height: {
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
<style lang="scss" scoped>
#utility-block {
  display: flex;
  width: 100%;
  /*min-height: 100px;*/
  max-height: 250px;
  height: 100%;
  // padding: $spacing-md;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

  &.dark {
    // background-color: $ui-03;
  }
  &.light {
    // background-color: $ui-02;
  }

  // .bx--inline-loading {
  //   justify-content: center;
  //   @include carbon--type-style("code-01");
  // }
  // .utility-block-text {
  //   @include carbon--type-style("code-02");
  // }

  // @include carbon--breakpoint('sm') {
  //   min-height: 350px;
  // }
}
</style>
