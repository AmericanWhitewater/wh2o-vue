<template>
  <main>
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <template v-if="!editMode">
      <template v-if="sanitizedDescription">
        <div
          ref="description"
          v-html="sanitizedDescription"
        />
      </template>
      <template v-else>
        <p class="mb-2">
          This reach does not have a description. If you know about this reach, please tell us about it!
        </p>
        <cv-button
          kind="tertiary"
          size="small"
          @click="toggleEditMode"
        >
          Add Description
        </cv-button>
      </template>
    </template>
    <template v-else>
      <content-editor
        :content="sanitizedDescription"
        show-control-bar
      />
    </template>
  </main>
</template>
<script>
import { mapState } from 'vuex'
import { ContentEditor } from '@/app/global/components'
import { globalAppActions } from '@/app/global/state'
export default {
  name: 'RiverDescription',
  components: { ContentEditor },
  editedContent: null,
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      riverDescription: state => state.riverDetailState.riverDetailData.data.description,
      editMode: state => state.appGlobalState.appGlobalData.editMode
    }),
    sanitizedDescription () {
      if (this.riverDescription) {
        const content = this.$sanitize(this.river.description, {
          disallowedAttributes: {
            '*': ['style']
          }
        })
        return content
      }
      return null
    }
  },
  methods: {
    toggleEditMode () {
      this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, !this.editMode)
    }
  }
}
</script>
<style lang="scss">
main {
  p {
    margin-bottom: 1.25rem;
  }
}
</style>
<docs>

we can make the editor a stand alone component and pass the editable content as a prop

</docs>
