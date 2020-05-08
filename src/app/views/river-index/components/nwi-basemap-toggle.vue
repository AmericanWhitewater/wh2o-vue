<template>
  <div
    class="nwi-basemap-toggle"
    :style="getToggleOffset"
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
import { riverIndexActions } from '../shared/state'
import { mapState } from 'vuex'

export default {
  name: 'nwi-basemap-toggle',
  props: {
    // allows offsetting for the fullscreen control if present
    offsetRight: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    baseMap: 'topo'
  }),
  computed: {
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle
    }),
    getToggleOffset () {
      if (this.offsetRight) {
        return 'right: calc(0.5rem + 42px);'
      } else {
        return 'right: 0.5rem;'
      }
    }
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
