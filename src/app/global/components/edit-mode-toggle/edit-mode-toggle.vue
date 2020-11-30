<template>
  <div
    class="edit-mode-toggle ml-spacing-sm"
    @click.exact="toggleEditMode"
    @keydown.enter="toggleEditMode"
  >
    <span>Edit mode</span>
    <cv-toggle
      small
      value
      :checked="editMode"
      :disabled="!user"
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
export default {
  name: 'edit-mode-toggle',
  computed: {
    editMode () {
      return this.$store.state.Global.editMode
    },
    user () {
      return this.$store.state.User.data
    }
  },
  methods: {
    toggleEditMode () {
      if (this.user) {
        this.$store.dispatch('Global/toggleEditMode', !this.editMode)
      } else {
        this.$store.dispatch('Global/sendToast', {
          title: 'Must log in to edit',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
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
