<template>
  <div class="page-header">
    <div class="bx--grid ">
      <div class="bx--row">
        <div class="bx--col">
          <div class="outside">
            <div class="inside">
              <template v-if="subtitle">
                <h4>{{ subtitle }}</h4>
              </template>
              <h1>{{ title }}</h1>
              <edit-mode-toggle v-if="editable" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditModeToggle from "../edit-mode-toggle/edit-mode-toggle";

export default {
  name: "PageHeader",
  components: {
    EditModeToggle
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    showConfirmation: false
  })
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
    // padding: 0.25rem 0.5rem 0.2rem 2rem;

    background-color: #fff;
    width: fit-content;
  }
  h1 {
    margin-bottom: $spacing-sm;
    padding: 11px 12px 11px 2rem;
  }
  h4 {
    padding: 11px 12px 0 2rem;
  }
  .bx--overflow-menu {
    background-color: $ui-02;
  }
  .bx--grid {
    padding-left: 0;
  }
}

.bx--col-lg-10 .bx--no-gutter--left {
  height: 100%;
}
</style>
