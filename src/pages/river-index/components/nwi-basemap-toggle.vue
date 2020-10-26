<template>
  <div class="nwi-basemap-toggle">
    <v-select
      dense
      filled
      hide-details
      v-model="baseMap"
      :items="[
        {
          text: 'Topographic',
          value: 'topo',
        },
        {
          text: 'Satellite',
          value: 'satellite',
        },
      ]"
    />
  </div>
</template>

<script>
export default {
  name: "nwi-basemap-toggle",
  data: () => ({
    dropdownActive: false,
  }),
  computed: {
    baseMap: {
      get() {
        return this.$store.state.RiverIndex.mapStyle;
      },
      set(value) {
        this.$store.dispatch("RiverIndex/setMapStyle", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.nwi-basemap-toggle {
  background-color: #fff;
  // border-radius: 3px;
  width: 10rem;
  top: 0.5rem;
  right: 0.5rem;
  // box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
  // display: block;

  // .bx--dropdown {
  //   border-radius: 3px;
  // }

  // button.bx--dropdown-text {
  //   cursor: pointer;
  // }
}
</style>
