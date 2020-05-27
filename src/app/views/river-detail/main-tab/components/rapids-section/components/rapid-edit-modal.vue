<template>
  <div :class="[{'visible':visible},'rapid-edit-modal']">
    <cv-modal
      :visible="visible"
      size="large"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
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
          v-model="formData.class"
          class="mb-spacing-md"
          title="Class"
          auto-filter
          label="I - V+"
          :options="poiClasses"
          :disabled="formPending"
        />
        <!-- temporarily commented out bc the carbon component is broken
             and it keeps throwing errors !-->
        <!-- <cv-multi-select
          v-model="formData.character"
          theme="light"
          :options="poiCharacteristics"
          title="Characteristics"
        /> -->
        <ContentEditor
          v-if="renderEditor && initialRapidDescription"
          :content="initialRapidDescription"
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
import { globalAppActions } from '@/app/global/state'
import { checkWindow, poiClasses } from '@/app/global/mixins'
import ContentEditor from '@/app/global/components/content-editor/content-editor'
import NwiMapEditor from './nwi-map-editor.vue'

import { lineString } from '@turf/helpers'
import along from '@turf/along'
import wkx from 'wkx'
import { Buffer } from 'buffer'

export default {
  name: 'rapid-edit-modal',
  components: {
    ContentEditor,
    NwiMapEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow, poiClasses],
  props: {
    visible: {
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
    initialRapidDescription: '',
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
      class: '',
      distance: 0,
      description: '',
      character: [],
      geom: { coordinates: [], type: 'point' }
    }
  }),
  computed: {
    rapids () {
      return this.$store.state.riverDetailState.rapidsData.data
    },
    activeRapid () {
      return this.rapidId ? this.rapids.find(r => r.id === this.rapidId) : null
    },
    modalTitle () {
      return this.activeRapid ? 'Edit Rapid' : 'New Rapid'
    },
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.$store.state.riverDetailState.riverDetailData.data.geom?.split(',').map(d => d.split(' '))
      return geom ? lineString(geom) : null
    }
  },
  methods: {
    descriptionUpdated (description) {
      this.formData.description = description
    },
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
    updateFormDataGeom (newCoords) {
      this.formData.geom.coordinates = [newCoords.lng, newCoords.lat]
      this.updateDistance()
    },
    updateDistance () {
      // placeholder to update `formData.distance` by calculating it
    },
    handleCancel () {
      this.$emit('edit:cancelled')
    },
    // TODO: get graphql to return something more usable than WKB.
    getGeomFromWKB (wkb) {
      if (wkb) {
        const buffer = Buffer.from(wkb, 'hex')
        const pointGeom = wkx.Geometry.parse(buffer).toGeoJSON()
        return pointGeom
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.renderEditor = true
    let distance
    if (this.activeRapid) {
      this.formData = Object.assign(this.formData, this.activeRapid)
      if (this.activeRapid.rloc) {
        // parse rloc into coords
        this.formData.geom = this.getGeomFromWKB(this.activeRapid.rloc)
      }
      distance = this.activeRapid.distance
      this.initialRapidDescription = this.activeRapid.description
    }
    if (!this.formData.geom.coordinates) {
      // if distance is present, use it to calculate the point
      // otherwise, create a point anywhere on the line
      const distanceAlong = distance || 0
      this.formData.geom = along(this.reachGeom, distanceAlong, { units: 'miles' }).geometry
    }
  }
}
</script>
