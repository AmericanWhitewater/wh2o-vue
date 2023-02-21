<template>
  <cv-modal
    ref="modalWrapper"
    size="large"
    class="geometry-edit-modal"
    @modal-shown="setModalOffset"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
  >
    <template slot="title">
      Edit Reach Geometry
    </template>
    <template slot="content">
      <geometry-editor
        :key="geomEditorKey"
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
</template>
<script>
import { checkWindow, mapHelpersMixin, shadowDomFixedHeightOffset } from '@/app/global/mixins'
import GeometryEditor from './components/geometry-editor.vue'
import turfLength from '@turf/length'

export default {
  name: 'geometry-edit-modal',
  components: {
    GeometryEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow, mapHelpersMixin, shadowDomFixedHeightOffset],
  props: {
    reach: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    geom: null,
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),
  computed: {
    reachLength () {
      if (this.geom) {
        return Number(turfLength(this.geom, { units: 'miles' }).toPrecision(2))
      } else {
        return undefined
      }
    },
    geomEditorKey () {
      return `geomEditor${this.reach?.id}`
    }
  },
  methods: {
    updateReachGeom (newGeom) {
      this.geom = newGeom
    },
    show() {
      this.$refs.modalWrapper.show();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm () {
      this.$emit('edit:submitted')
      this.$parent.editGeometryModalVisible = false
      this.$store.dispatch('RiverDetail/updateProperty', {
        id: this.$route.params.id,
        geom: this.geom.geometry,
        ploc: this.geom.geometry.coordinates[0],
        tloc: this.geom.geometry.coordinates.slice(-1)[0],
        length: this.reachLength
      })
    },
    _cancel () {
      this.$emit('edit:cancelled')
    }
  },
  mounted () {
    this.geom = this.reachGeom
  }
}
</script>
<style lang="scss">
.geometry-edit-modal {
  .bx--modal-content {
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>