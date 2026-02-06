<template>
  <div id="map-tab">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12 bx--col-max-12">
          <div class="map-header">
            <cv-button
              v-if="reach"
              kind="tertiary"
              size="small"
              @click="downloadGeoJSON"
            >
              <Download20 />
              Download GeoJSON
            </cv-button>
            <cv-button
              v-if="reach"
              kind="tertiary"
              size="small"
              @click="downloadKML"
            >
              <Download20 />
              Download KML
            </cv-button>
          </div>
          <NwiMap
            v-if="startingBounds"
            :include-legend="false"
            :has-controls="false"
            :detail-reach-id="reachId"
            :source-layers="sourceLayers"
            :starting-bounds="startingBounds"
            hide-result-counter
            @clickFeature="clickFeature"
          />
          <utility-block
            v-if="!startingBounds"
            text="failed to load map"
            state="error"
            class="mb-md"
          />
        </div>
        <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-4 bx--col-max-4">
          <info-panel
            :feature="detailFeature"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NwiMap } from '@/app/views/river-index/components'
import { mapState } from 'vuex'
import { InfoPanel } from './components'
import { mapHelpersMixin } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import Download20 from '@carbon/icons-vue/es/download/20.js'
import { point } from '@turf/helpers'
import tokml from 'tokml'

export default {
  name: 'map-tab',
  components: {
    InfoPanel,
    NwiMap,
    UtilityBlock,
    Download20
  },
  mixins: [mapHelpersMixin],
  data: () => ({
    detailFeature: null,
    includeLegend: false,
    mapControls: ['baseMap', 'color', 'fullscreen'],
    sourceLayers: ['reach-segments', 'reaches-without-geom', 'rapids', 'access']
  }),
  computed: {
    ...mapState({
      riverLoading: state => state.RiverDetail.loading,
      riverError: state => state.RiverDetail.error,
      reach: state => state.RiverDetail.data,
      rapids: state => state.RiverRapids.data,
    }),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    },
    startingBounds () {
      return this.reachStartingBounds
    },
    geojsonData () {
      if (!this.reach) return null
      
      const features = []
      
      // Add reach geometry as LineString feature using turf
      if (this.reachGeom) {
        features.push({
          ...this.reachGeom,
          properties: {
            type: 'reach',
            id: this.reach.id,
            name: `${this.reach.river} - ${this.reach.section}`,
            river: this.reach.river,
            section: this.reach.section,
            difficulty: this.reach.class,
            length: this.reach.length,
            abstract: this.reach.abstract
          }
        })
      }
      
      // Add rapids as Point features using turf
      if (this.rapids && this.rapids.length > 0) {
        this.rapids.forEach(rapid => {
          if (rapid.rloc) {
            const [lng, lat] = rapid.rloc.split(' ').map(parseFloat)
            const rapidPoint = point([lng, lat], {
              type: 'rapid',
              id: rapid.id,
              name: rapid.name,
              difficulty: rapid.difficulty,
              distance: rapid.distance,
              description: rapid.description
            })
            features.push(rapidPoint)
          }
        })
      }
      
      return {
        type: 'FeatureCollection',
        features
      }
    }
  },
  methods: {
    clickFeature (feature) {
      this.detailFeature = feature
    },
    downloadGeoJSON () {
      if (!this.geojsonData) return
      
      const filename = `${this.reach.river}-${this.reach.section}.geojson`
        .replace(/[^a-z0-9.-]/gi, '-')
        .toLowerCase()
      
      const blob = new Blob([JSON.stringify(this.geojsonData, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    },
    downloadKML () {
      if (!this.geojsonData) return
      
      const filename = `${this.reach.river}-${this.reach.section}.kml`
        .replace(/[^a-z0-9.-]/gi, '-')
        .toLowerCase()
      
      const kml = tokml(this.geojsonData, {
        documentName: `${this.reach.river} - ${this.reach.section}`,
        documentDescription: this.reach.abstract || ''
      })
      
      const blob = new Blob([kml], {
        type: 'application/vnd.google-earth.kml+xml'
      })
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>
<style lang="scss" scoped>
#map-tab {
  padding-top: 2rem;
}

.map-header {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
