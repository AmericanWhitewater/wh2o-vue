<template>
  <div class="gage-detail">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <h1>Gage Detail</h1>
          <h3> {{ $route.params.id }} </h3>

          <template v-if="loading">
            loading
          </template>
          <template v-else-if="data">
            {{ data }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'gage-detail',
  computed: {
    ...mapState({
      data: state => state.GageDetail.data,
      loading: state => state.GageDetail.loading,
      error: state => state.GageDetail.error,
      refId: state => state.GageDetail.refId
    }),
    gageId () {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      load: 'GageDetail/getProperty',
      setRefId: 'GageDetail/setRefId'
    })
  },
  created () {
    if (!this.data || (this.refId !== this.gageId)) {
      this.load(`/gage-detail?id=${this.gageId}`)
      this.setRefId(this.gageId)
    }
  }
}
</script>
