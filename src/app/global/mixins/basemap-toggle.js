import NwiBasemapToggle from "@/app/views/river-index/components/nwi-basemap-toggle.vue";
import { arcgisApiKey, satelliteMapLayerId, topoMapLayerId } from "@/app/environment";

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
      let basemapStyle;
      if (mapType === "satellite") {
        basemapStyle = satelliteMapLayerId || "ArcGIS:Imagery"
      } else { // mapType == "topo"
        basemapStyle = topoMapLayerId || "ArcGIS:Topographic"
      }
      return `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapStyle}?type=style&token=${arcgisApiKey}`;
    }
  }
};
