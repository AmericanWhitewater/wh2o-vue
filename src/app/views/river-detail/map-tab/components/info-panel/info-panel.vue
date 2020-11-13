<template>
  <div
    v-view.once="loadRapids"
    class="info-panel"
  >
    <UtilityBlock
      v-if="noFeature"
      state="content"
      text="Click a feature on the map to display more information."
    />
    <div
      v-else
      class="info-detail river-main-content-wrapper mb-spacing-sm"
    >
      <div class="aw-rapid bx--tile">
        <rapid-detail
          v-if="isRapid"
          :rapid="featureProperties"
        />
        <access-detail
          v-else-if="isAccess"
          :access="featureProperties"
        />
        <reach-detail
          v-else-if="isReach"
          :reach="featureProperties"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  AccessDetail,
  ReachDetail,
  RapidDetail
} from '../'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
import { fetchRapidsData } from '@/app/views/river-detail/controllers'

export default {
  name: 'info-panel',
  components: {
    AccessDetail,
    RapidDetail,
    ReachDetail,
    UtilityBlock
  },
  props: {
    feature: {
      type: Object,
      required: false
    }
  },
  computed: {
    noFeature () {
      return !this.feature
    },
    // use feature layer to infer what the feature is
    isRapid () {
      return this.feature && this.feature.sourceLayer === 'rapids'
    },
    isAccess () {
      return this.feature && this.feature.sourceLayer === 'access'
    },
    isReach () {
      return this.feature && ['reach-segments', 'reaches-without-geom'].includes(this.feature.sourceLayer)
    },
    featureProperties () {
      if (this.feature) {
        const props = { ...this.feature.properties }
        if (this.isAccess) {
          props.coords = this.feature.geometry.coordinates
        }
        return props
      }
      return null
    }
  },
  methods: {
    closeInfoBox () {
      this.$emit('closeInfoBox')
    },
    // if the main tab wasn't viewed first, this loads all rapid data
    // we can display based on map response, but API response is better and more consistent
    // TODO: this doesn't work for when you click rapids on *OTHER* reaches...it fails gracefully
    // (because of the tileserver data being used instead) but need to figure out a different way to handle...
    loadRapids () {


      // this.$store.dispatch(
      //   rapidsActions.FETCH_RAPIDS_DATA,
      //   this.$route.params.id
      // )

      this.$store.dispatch('RiverRapids/getProperty', {
        id: this.$route.params.id,
        method: fetchRapidsData
      })
    }
  }
}
</script>

<style scoped lang="scss">
.info-panel {
  background: rgba(255, 255, 255, 0.7);

  .no-feature-notice {
    height: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
