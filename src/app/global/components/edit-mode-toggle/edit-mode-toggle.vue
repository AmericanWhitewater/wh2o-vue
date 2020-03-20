<template>
  <div
    class="edit-mode-toggle ml-spacing-sm"
    @click.exact="toggleEditMode"
  >
    <span>Edit mode</span>
    <cv-toggle
      small
      value
      :checked="editMode"
      @change="toggleEditMode"
    >
      <template slot="text-left">
        <span />
      </template>
      <template slot="text-right">
        <span />
      </template>
    </cv-toggle>
  </div>
</template>

<script>
import { globalAppActions } from '@/app/global/state'

export default {
  name: 'edit-mode-toggle',
  computed: {
    editMode () {
      return this.$store.state.appGlobalState.appGlobalData.editMode
    }
  },
  methods: {
    toggleEditMode () {
      this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, !this.editMode)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-mode-toggle {
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: $ui-01;
  padding: 0 0.5rem;
  cursor: pointer;
  span {
    font-size: 14px;
    margin-right: 0.5rem;
  }
}
</style>
