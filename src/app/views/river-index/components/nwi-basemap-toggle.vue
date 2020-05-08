<template>
  <div class="nwi-basemap-toggle">
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
import { riverIndexActions } from '../shared/state'
import { mapState } from 'vuex'

export default {
  name: 'nwi-basemap-toggle',
  data: () => ({
    baseMap: 'topo'
  }),
  computed: {
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle
    })
  },
  watch: {
    baseMap (v) {
      this.$store.dispatch(riverIndexActions.SET_MAP_STYLE, v)
    },
    // ensures control is synced with state on first load
    mapStyle: {
      immediate: true,
      handler (v) {
        this.baseMap = v
      }
    }
  }
}
</script>

<style lang="scss">
.nwi-basemap-toggle {
  background-color: #fff;
  border-radius: 3px;
  top: 10px; // make space for toolbar on top
  right: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 7rem;
  position: absolute;
  z-index: 1;
  display: block;

  button.bx--dropdown-text {
    cursor: pointer;
  }
}
</style>
