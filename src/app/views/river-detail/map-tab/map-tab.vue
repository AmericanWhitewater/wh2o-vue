<template>
  <div id="map-tab">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12 bx--col-max-12">
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
import { mapActions } from '../shared/state'
import { mapState } from 'vuex'
import { InfoPanel } from './components'
import { mapHelpersMixin } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'

import {fetchAccessData} from "@/app/views/river-detail/controllers"

export default {
  name: 'map-tab',
  components: {
    InfoPanel,
    NwiMap,
    UtilityBlock
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
      loading: state => state.RiverMap.loading,
      error: state => state.RiverMap.error,
      data: state => state.RiverMap.data,
      riverLoading: state => state.RiverDetail.loading,
      riverError: state => state.RiverDetail.error,
      riverData: state => state.RiverDetail.data
    }),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    },
    startingBounds () {
      return this.reachStartingBounds
    }
  },
  methods: {
    loadData () {
      if (!this.data) {
        // this.$store.dispatch(mapActions.FETCH_ACCESS_DATA, this.reachId)
        this.$store.dispatch('RiverMap/getProperty', {
          id:this.reachId,
          method:fetchAccessData
        })
      }
    },
    clickFeature (feature) {
      this.detailFeature = feature
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
#map-tab {
  padding-top: 2rem;
}
</style>
