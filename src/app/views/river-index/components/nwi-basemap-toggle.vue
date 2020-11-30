<template>
  <div
    class="nwi-basemap-toggle"
  >
    <cv-dropdown
      v-model="baseMap"
    >
      <cv-dropdown-item value="topo">
        Topo
      </cv-dropdown-item>
      <cv-dropdown-item value="satellite">
        Satellite
      </cv-dropdown-item>
    </cv-dropdown>
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
  width: 7rem;
  position: absolute;
  z-index: 1;
  display: block;

  .bx--dropdown {
    border-radius: 3px;
  }

  button.bx--dropdown-text {
    cursor: pointer;
  }
}
</style>
