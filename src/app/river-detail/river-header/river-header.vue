<template>
  <section class="bleed river-header bg-topo">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-lg-10">
          <div class="outside">
            <div class="inside">
              <h4>{{ name }}</h4>
              <h1>{{ section }}</h1>
              <edit-mode-toggle />
            </div>
          </div>
        </div>
        <div class="bx--col">
          <div v-show="editMode" class="edit-icons">
            <cv-button small>
              Drag Icon
            </cv-button>
            <cv-button small>
              Upload Icon
            </cv-button>
          </div>
        </div>
      </div>
    </div>
    <cv-modal v-if="showConfirmation" kind="danger" :visible="showConfirmation">
      <!-- <template slot="label">label</template> -->
      <template slot="title">
        Are you sure?
      </template>
      <template slot="content">
        <p>This action cannot be undone.</p>
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        OK
      </template>
    </cv-modal>
  </section>
</template>
<script>
import { EditModeToggle } from "@/app/global/components";

export default {
  name: "RiverHeader",
  components: {
    EditModeToggle
  },
  props: {
    name: {
      type: String,
      required: true,
      default: null
    },
    section: {
      type: String,
      required: true,
      default: null
    }
  },
  data: () => ({
    showConfirmation: false
  }),
  computed: {
    reachId() {
      return this.$route.params.id;
    },
    editMode() {
      return this.$store.state.appGlobalState.appGlobalData.editMode;
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  &.river-header {
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
  }
}
.bx--grid {
  padding-left: 0;
}
</style>
