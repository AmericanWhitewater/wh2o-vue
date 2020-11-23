<template>
  <div class="Accidents-table">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <h1>
            Accidents
          </h1>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <template v-if="loading">
            loading
          </template>
          <template v-else-if="data">
            <div v-for="(accidents, index) in data" :key="index">
             <h3> {{ accidents.state }} </h3>
             <p> {{ accidents.location }} </p>
           </div>
          </template>
          <template v-else>
            error
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'accidents',
  computed: {
    ...mapState({
      data: state => state.Accidents.data,
      loading: state => state.Accidents.loading,
      error: state => state.Accidents.error
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('Accidents/getProperty')
    }
  }
}
</script>
