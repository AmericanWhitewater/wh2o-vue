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
      
      // Helper to remove undefined/null properties
      const cleanProperties = (props) => {
        return Object.fromEntries(
          Object.entries(props).filter(([, v]) => v != null)
        )
      }
      
      // Add reach geometry as LineString feature using turf
      if (this.reachGeom) {
        const reachName = `${this.reach.river} - ${this.reach.section}`
        features.push({
          type: 'Feature',
          geometry: this.reachGeom.geometry,
          properties: cleanProperties({
            name: reachName,
            title: reachName,
            type: 'reach',
            id: this.reach.id,
            river: this.reach.river,
            section: this.reach.section,
            difficulty: this.reach.class,
            length: this.reach.length,
            description: this.reach.abstract,
            'marker-color': '#0066cc'
          })
        })
      }
      
      // Add POIs as Point features using turf
      if (this.rapids && this.rapids.length > 0) {
        this.rapids.forEach(poi => {
          if (poi.rloc) {
            const [lng, lat] = poi.rloc.split(' ').map(parseFloat)
            // Use character array from data, default to 'poi' if not set
            const poiType = poi.character && poi.character.length > 0 
              ? poi.character.join(', ') 
              : 'POI'
            const poiName = poi.name || `Unnamed ${poiType}`
            features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lng, lat]
              },
              properties: cleanProperties({
                name: poiName,
                title: poiName,
                type: poiType,
                character: poi.character,
                id: poi.id,
                difficulty: poi.difficulty,
                distance: poi.distance,
                description: poi.description,
                'marker-color': '#ff0000',
                'marker-symbol': 'danger'
              })
            })
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
