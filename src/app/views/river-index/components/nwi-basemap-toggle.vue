<template>
  <div
    class="nwi-basemap-toggle"
  >
    <cv-select
      v-model="baseMap"
      label=""
      class="cv-select-without-label"
    >
      <cv-select-option value="topo">
        Topo
      </cv-select-option>
      <cv-select-option value="satellite">
        Satellite
      </cv-select-option>
    </cv-select>
  </div>
</template>

<script>
export default {
  name: 'nwi-basemap-toggle',
  computed: {
    baseMap: {
      get () {
        return this.$store.state.RiverIndex.mapStyle
      },
      set (value) {
        this.$store.dispatch('RiverIndex/setMapStyle', value)
      }
    }
  }
}
</script>

<style lang="scss">
.nwi-basemap-toggle {
  background-color: #fff;
  border-radius: 3px;
  top: 0.5rem;
  right: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
  display: block;

  .bx--select-input {
    border-radius: 3px;
  }
}
</style>
