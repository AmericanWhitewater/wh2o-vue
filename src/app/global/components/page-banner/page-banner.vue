<template>
  <div class="page-banner">
    <template v-if="map">
      <div class="map-wrapper">
        <nwi-map
          v-if="startingBounds"
          height="400"
          :detail-reach-id="Number(reachId)"
          :include-legend="false"
          :has-controls="false"
          :source-layers="$options.sourceLayers"
          :starting-bounds="startingBounds"
          fullscreen-target="map-wrapper"
          hide-result-counter
        />
      </div>
    </template>

    <header v-if="!map">
      <div>
        <h4>{{ subtitle }}</h4>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <slot />
      </div>
    </header>
  </div>
</template>
<script>
import bbox from '@turf/bbox'
import { lineString } from '@turf/helpers'
import NwiMap from '@/app/views/river-index/components/nwi-map.vue'
export default {
  name: 'page-banner',
  components: {
    'nwi-map': NwiMap
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    map: {
      type: Boolean,
      required: false
    },
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
<style lang="scss" scoped>
.page-banner {
  header {
    padding: $spacing-sm $spacing-md;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      @include carbon--breakpoint("sm") {
        @include carbon--type-style("productive-heading-03");
      }
      @include carbon--breakpoint("md") {
        @include carbon--type-style("productive-heading-04");
      }
    }
    h4 {
      @include carbon--breakpoint("sm") {
        @include carbon--type-style("productive-heading-02");
        margin-bottom: $spacing-xs;
      }
      @include carbon--breakpoint("md") {
        @include carbon--type-style("productive-heading-03");
      }
    }
  }
  .map-wrapper {
    width: 100%;
  }
}
</style>
