<template>
  <div
    class="edit-mode-toggle"
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
        &nbsp;
      </template>
      <template slot="text-right">
        &nbsp;
      </template>
    </cv-toggle>
  </div>
</template>

<script>
import { globalAppActions } from '@/app/global/state'

export default {
  name: 'EditModeToggle',
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
  margin-left: 2rem;
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
