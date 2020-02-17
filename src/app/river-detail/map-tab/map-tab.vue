<template>
  <div class="map-tab">
    <template v-if="loading">
      <loading-block text="Loading Map..." />
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Map unavailable"
        text="please try again later"
      />
    </template>
    <template v-if="!loading && !error">
      <div class>
        map results!
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'

export default {
  name: 'MapTab',
  components: {
    ErrorBlock,
    LoadingBlock
  },
  data: () => ({
    mapHttpConfig: {
      lat: null,
      lon: null
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.mapData.loading,
      error: state => state.riverDetailState.mapData.error
    })
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      if (!this.data && !this.error) {
        this.$store.dispatch(mapActions.FETCH_MAP_DATA, this.mapHttpConfig)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.map-tab {
  padding-top: 2rem;
}
</style>
