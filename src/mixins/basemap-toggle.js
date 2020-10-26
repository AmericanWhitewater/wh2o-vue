import NwiBasemapToggle from '@/pages/river-index/components/nwi-basemap-toggle.vue'

export const basemapToggleMixin = {
  computed: {
    baseMapUrl () {
      if (this.mapStyle === 'topo') {
        return 'mapbox://styles/mapbox/outdoors-v11'
      } else if (this.mapStyle === 'satellite') {
        // custom version of `satellite-v8` that includes icons that already exist in `outdoors-v11`
        return 'mapbox://styles/americanwhitewater/ck1h4j4hm2bts1cpueefclrrn'
      } else {
        return 'mapbox://styles/mapbox/outdoors-v11'
      }
    }
  },
  components: {
    NwiBasemapToggle
  },
  watch: {
    mapStyle (v) {
      this.map.setStyle(this.baseMapUrl)
    }
  }
}
