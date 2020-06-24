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
        <geometry-editor
          @updatedGeom="updateReachGeom"
        />
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
import { mapState } from 'vuex'

import { globalAppActions } from '@/app/global/state'
import { checkWindow } from '@/app/global/mixins'
import GeometryEditor from './components/geometry-editor.vue'
import { lineString } from '@turf/helpers'

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
    geom: null
  }),
  computed: {
    ...mapState({
      data: state => state.riverDetailState.riverDetailData.data
    }),
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' ').map(e => parseFloat(e)))
      return geom ? lineString(geom, {}, { id: 'reachGeom' }) : null
    }
  },
  methods: {
    updateReachGeom (newGeom) {
      this.geom = newGeom
    },
    submitForm () {
      this.$emit('edit:submitted')

      setTimeout(() => {
        this.$emit('edit:success')
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Geometry edited',
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
    this.geom = this.reachGeom
  }
}
</script>
