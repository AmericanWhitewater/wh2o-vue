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
    }
  }
}
</script>
<style lang="scss" scoped>
.page-banner {
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
          margin-bottom:$spacing-xs;
        }
        @include carbon--breakpoint("md") {
          @include carbon--type-style("productive-heading-03");
        }
      }
    }
}
</style>
