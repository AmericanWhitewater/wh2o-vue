import NwiBasemapToggle from "@/app/views/river-index/components/nwi-basemap-toggle.vue";

export const basemapToggleMixin = {
  computed: {
    baseMapUrl() {
      return this.baseMapUrlFor(this.mapStyle);

    },
  },
  components: {
    NwiBasemapToggle,
  },
  watch: {
    mapStyle() {
      this.map.setStyle(this.baseMapUrl);
    },
  },
  methods: {
    baseMapUrlFor(mapType) {
      if (mapType === "topo") {
        return "mapbox://styles/mapbox/outdoors-v11";
      } else if (mapType === "satellite") {
        // custom version of `satellite-v8` that includes icons that already exist in `outdoors-v11`
        return "mapbox://styles/americanwhitewater/ck1h4j4hm2bts1cpueefclrrn";
      } else {
        return "mapbox://styles/mapbox/outdoors-v11";
      }
    }
  }
};
