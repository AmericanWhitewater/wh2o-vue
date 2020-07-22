<template>
  <div class="page-banner">
    <template v-if="map">
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
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
export default {
  name: 'page-banner',
  components: {
    'nwi-map': NwiMap,
    UtilityBlock
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
  position: relative;
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
  .edit-overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba($ui-02, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .map-wrapper {
    width: 100%;
  }
}
</style>
