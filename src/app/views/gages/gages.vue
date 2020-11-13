<template>
  <div class="Gages-table">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <h1>
            Gages
          </h1>
        </div>
      </div>
      <div class="bx--row">
        <template v-if="loading">
          loading
        </template>
        <template v-else-if="data">
          <div
            v-for="(gage, index) in data"
            :key="index"
            class="bx--col-xs-12 bx--col-sm-4 bx--col-lg-6"
          >
            <hr>
            <h3> {{ gage.name }} </h3>
            <h4> {{ gage.header_updated }} </h4>
            <h4> {{ gage.source }} </h4>
            <router-link :to="`/gage-detail/${gage.id}`" >Gage Detail</router-link>
            <div class="mb-spacing-md"/>
          </div>
        </template>
        <template v-else>
          error
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'gages',
  computed: {
    ...mapState({
      data: state => state.Gages.data,
      loading: state => state.Gages.loading,
      error: state => state.Gages.error
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('Gages/getProperty', 'gage-headers')
    }
  }
}
</script>
