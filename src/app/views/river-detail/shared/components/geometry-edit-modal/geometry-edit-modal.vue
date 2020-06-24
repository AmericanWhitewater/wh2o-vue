<template>
  <div :class="[{'visible':visible},'geometry-editor-modal']">
    <cv-modal
      :visible="visible"
      size="large"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
    >
      <template slot="title">
        Edit Reach Geometry
      </template>
      <template slot="content">
        <geometry-editor />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { globalAppActions } from '@/app/global/state'
import { checkWindow } from '@/app/global/mixins'
import GeometryEditor from './components/geometry-editor.vue'

export default {
  name: 'geometry-edit-modal',
  components: {
    GeometryEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    renderEditor: false,
    formPending: false
  }),
  computed: {
  },
  methods: {
    submitForm () {
      this.$emit('edit:submitted')

      setTimeout(() => {
        this.$emit('edit:success')
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Rapid Edited',
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      })
    },
    handleCancel () {
      this.$emit('edit:cancelled')
    }
  },
  mounted () {
  }
}
</script>
