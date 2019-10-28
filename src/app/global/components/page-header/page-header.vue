<template>
  <div class="bx--grid page-header">
    <div class="bx--row">
      <div class="bx--col">
        <div class="outside">
          <div class="inside">
            <template v-if="subtitle">
              <h4>{{ subtitle }}</h4>
            </template>
            <h1>{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  },
  data: () => {
    return {
      showConfirmation: false
    };
  }
};
</script>
<style lang="scss">
.page-header {
  background-color: $ui-04;
  width: 100%;
  height: 50vh;
  .bx--grid,
  .bx--row,
  .bx--col,
  .outside,
  .inside {
    height: 100%;
  }
  .inside {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    padding-bottom: $spacing-lg;
  }
  h1,
  h4 {
    color: #fff;
  }
  h4 {
    margin-bottom: $spacing-sm;
  }
  h1 {
    margin-bottom: $spacing-md;
  }
  .bx--overflow-menu {
    background-color: $ui-02;
  }
}
</style>
