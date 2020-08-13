<template>
  <div class="page-banner">
    <header>
      <div>
        <h4>{{ subtitle }}</h4>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <slot />
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'page-banner',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
.page-banner {
  position: relative;
  header {
    padding: $spacing-sm $spacing-md;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      @include carbon--breakpoint("sm") {
        @include carbon--type-style("productive-heading-03");
      }
      @include carbon--breakpoint("md") {
        @include carbon--type-style("productive-heading-04");
      }
    }
    h4 {
      @include carbon--breakpoint("sm") {
        @include carbon--type-style("productive-heading-02");
        margin-bottom: $spacing-xs;
      }
      @include carbon--breakpoint("md") {
        @include carbon--type-style("productive-heading-03");
      }
    }
  }
  .edit-overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba($ui-02, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .map-wrapper {
    width: 100%;
  }
}
</style>
