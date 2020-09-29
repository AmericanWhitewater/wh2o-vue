<template>
  <div :class="[{'visible':visible},'geometry-editor-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      size="large"
      @modal-shown="setModalOffset"
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
import { checkWindow, shadowDomFixedHeightOffset } from '@/app/global/mixins'
import GeometryEditor from './components/geometry-editor.vue'
import { lineString } from '@turf/helpers'
import { riverDetailActions } from '../../state'

export default {
  name: 'geometry-edit-modal',
  components: {
    GeometryEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow, shadowDomFixedHeightOffset],
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
      this.$parent.editGeometryModalVisible = false
      this.$store.dispatch(riverDetailActions.UPDATE_RIVER_DETAIL_GEOM, {
        geom: this.geom.geometry,
        ploc: this.geom.geometry.coordinates[0],
        tloc: this.geom.geometry.coordinates.slice(-1)[0]
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
