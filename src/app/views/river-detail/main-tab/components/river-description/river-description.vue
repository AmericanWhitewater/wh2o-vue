<template>
  <main>
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <!-- need to sanitize v-html? -->
    <template v-if="!editMode">
      <p v-html="river.description" />
    </template>
    <template v-else>
      <content-editor :content="river.description" />
    </template>
  </main>
</template>
<script>
import { mapState } from 'vuex'
import { ContentEditor } from '@/app/global/components'

export default {
  name: 'RiverDescription',
  components: { ContentEditor },
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      editMode: state => state.appGlobalState.appGlobalData.editMode
    })
  }
}
</script>
<style lang="scss" scoped></style>
<docs>

we can make the editor a stand alone component and pass the editable content as a prop

</docs>
