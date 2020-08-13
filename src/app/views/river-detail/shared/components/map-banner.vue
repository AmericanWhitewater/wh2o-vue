<template>
  <div class="page-banner">
    <div class="map-wrapper">
      <template v-if="startingBounds">
        <nwi-map
          height="400"
          :detail-reach-id="Number(reachId)"
          :include-legend="false"
          :has-controls="false"
          :source-layers="$options.sourceLayers"
          :starting-bounds="startingBounds"
          fullscreen-target="map-wrapper"
          hide-result-counter
        />
      </template>
      <template v-else>
        <utility-block
          text="Reach Map Unavailable"
          state="content"
          theme="dark"
        />
      </template>
      <slot />
    </div>
  </div>
</template>
<script>
import bbox from '@turf/bbox'
import { lineString } from '@turf/helpers'
import NwiMap from '@/app/views/river-index/components/nwi-map.vue'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'

export default {
  name: 'map-banner',
  components: {
    'nwi-map': NwiMap,
    UtilityBlock
  },
  props: {
    geom: {
      type: String,
      required: false
    },
    reachId: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    }
  },
  sourceLayers: ['reach-segments', 'access'],
  computed: {
    startingBounds () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      if (this.geom) {
        const bounds = this.geom.split(',').map(d => d.split(' '))
        return bbox(lineString(bounds))
      }
      return null
    }
  }
}
</script>
