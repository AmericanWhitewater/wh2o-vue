<template>
  <div class="confirm-delete-modal">
    <cv-modal
      kind="danger"
      :primary-button-disabled="!inputValid"
      :visible="visible"
      @primary-click="$emit('delete:confirmed')"
      @secondary-click="$emit('delete:canceled')"
      @modal-hide-request="$emit('delete:canceled')"
    >
      <template slot="title">
        Confirm Delete
      </template>
      <template slot="content">
        <p class="mb-sm">
          Deleting {{ resourceName }} is a permanent. This action cannot be undone.
        </p>
        <div class="confirm-delete-warning-text mb-sm">
          <h4>{{ resourceName }}</h4>
        </div>
        <cv-text-input
          v-model="confirmDeleteInput"
          theme="light"
          label="Type resource title to confirm delete"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        OK
      </template>
    </cv-modal>
  </div>
</template>
<script>
export default {
  name: 'confirm-delete-modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    resourceName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    confirmDeleteInput: ''
  }),
  computed: {
    inputValid () {
      const resourceName = this.resourceName.replace(/\s+/g, '-').toLowerCase()
      const userInput = this.confirmDeleteInput.replace(/\s+/g, '-').toLowerCase()

      if (resourceName === userInput) {
        return true
      }

      return false
    }
  }
}
</script>
