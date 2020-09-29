<template>
  <div class="rapid-edit-modal">
    <cv-modal
      ref="modalWrapper"
      :visible="rapidModalVisible"
      size="large"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
      @modal-shown="setModalOffset"
    >
      <template slot="title">
        {{ modalTitle }}
      </template>
      <template slot="content">
        <cv-text-input
          v-model="formData.name"
          class="mb-spacing-md"
          label="Name"
          data-modal-primary-focus
          :disabled="formPending"
        />
        <label class="bx--label mb-spacing-xs">Location</label>
        <nwi-map-editor
          height="350"
          class="mb-spacing-md"
          :geom="formData.geom"
          @poiMoved="updateFormDataGeom"
        />
        <!-- remove this field if we can calculate value from dropped pin -->
        <cv-number-input
          v-model="formData.distance"
          class="mb-spacing-md"
          label="Distance From Start"
          step=".01"
          :max="4132"
          :min="0"
          :mobile="windowWidth <= $options.breakpoints.md"
          :disabled="formPending"
        />
        <cv-number-input
          v-model="formData.geom.coordinates[1]"
          class="mb-spacing-md"
          label="Lat"
          :max="90"
          :min="-90"
          step=".0000001"
          :disabled="formPending"
        />
        <cv-number-input
          v-model="formData.geom.coordinates[0]"
          class="mb-spacing-md"
          label="Lng"
          :max="180"
          :min="-180"
          step=".0000001"
          :disabled="formPending"
        />
        <cv-combo-box
          v-model="formData.difficulty"
          class="mb-spacing-md"
          title="Class"
          auto-filter
          label="I - V+"
          :options="poiClasses"
          :disabled="formPending"
        />
        <cv-multi-select
          v-model="formData.character"
          theme="light"
          :options="poiCharacteristics"
          title="Characteristics"
        />
        <ContentEditor
          v-if="renderEditor"
          :content="formData.description"
          label="Description"
          placeholder=" "
          @content:updated="descriptionUpdated"
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
import { rapidsActions } from '../../../../shared/state'
import { checkWindow, poiClasses, shadowDomFixedHeightOffset } from '@/app/global/mixins'
import ContentEditor from '@/app/global/components/content-editor/content-editor'
import NwiMapEditor from './nwi-map-editor.vue'

import { lineString, point } from '@turf/helpers'
import lineSlice from '@turf/line-slice'
import geoLength from '@turf/length'
import along from '@turf/along'

export default {
  name: 'rapid-edit-modal',
  components: {
    ContentEditor,
    NwiMapEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow, poiClasses, shadowDomFixedHeightOffset],
  props: {
    rapidModalVisible: {
      type: Boolean,
      required: true
    },
    rapidId: {
      type: String,
      required: false
    }
  },
  data: () => ({
    renderEditor: false,

    formPending: false,
    poiCharacteristics: [
      {
        value: 'putin',
        label: 'Put In',
        name: 'putin'
      },
      {
        value: 'hazard',
        label: 'Hazard',
        name: 'hazard'
      },
      {
        value: 'portage',
        label: 'Portage',
        name: 'portage'
      },
      {
        value: 'access',
        label: 'Access Point',
        name: 'access'
      },

      {
        value: 'waterfall',
        label: 'Waterfall / Large Drop',
        name: 'waterfall'
      },
      {
        value: 'takeout',
        label: 'Take Out',
        name: 'takeout'
      },
      {
        value: 'rapid',
        label: 'Rapid',
        name: 'rapid'
      },
      {
        value: 'other',
        label: 'Other',
        name: 'other'
      }
    ],
    formData: {
      name: '',
      difficulty: '',
      distance: 0,
      description: '',
      character: [],
      geom: { coordinates: [], type: 'point' }
    }
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    activeRapid () {
      return this.rapidId ? this.rapids.find(r => r.id === this.rapidId) : null
    },
    modalTitle () {
      return this.activeRapid ? 'Edit Rapid' : 'New Rapid'
    },
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.river.geom?.split(',').map(d => d.split(' ').map(y => parseFloat(y)))
      return geom ? lineString(geom) : null
    }
  },
  methods: {
    descriptionUpdated (description) {
      this.formData.description = description
    },
    submitForm () {
      this.$emit('edit:submitted')
      let message
      // different actions for *new* POI vs. updated POI
      if (this.activeRapid) {
        this.$store.dispatch(rapidsActions.UPDATE_RAPID, {
          id: this.activeRapid.id,
          ...this.formData
        })
        message = 'Rapid Edited'
      } else { // creating a new rapid
        this.$store.dispatch(rapidsActions.CREATE_RAPID, {
          id: this.$randomId(),
          reach_id: this.river.id,
          ...this.formData
        })
        message = 'Rapid Created'
      }

      setTimeout(() => {
        this.$emit('edit:success')
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: message,
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      })
    },
    updateFormDataGeom (newCoords) {
      this.formData.geom.coordinates = [newCoords.lng, newCoords.lat]
      this.updateDistance()
    },
    updateDistance () {
      const segment = lineSlice(
        point(this.reachGeom.geometry.coordinates[0]),
        point(this.formData.geom.coordinates),
        this.reachGeom)
      this.formData.distance = geoLength(segment, { units: 'miles' }).toFixed(2)
    },
    handleCancel () {
      this.$emit('edit:cancelled')
    }
  },
  mounted () {
    let distance
    if (this.activeRapid) {
      this.formData = Object.assign(this.formData, this.activeRapid)
      if (this.activeRapid.rloc) {
        const coords = this.activeRapid.rloc.split(' ').map(x => parseFloat(x))
        this.formData.geom = point(coords).geometry
      }
      distance = this.activeRapid.distance
    }
    this.renderEditor = true
    if (!this.formData.geom.coordinates.length && this.reachGeom) {
      // if distance is present, use it to calculate the point
      // otherwise, create a point anywhere on the line
      const distanceAlong = distance || 0
      this.formData.geom = along(this.reachGeom, distanceAlong, { units: 'miles' }).geometry
    }
  }
}
</script>
