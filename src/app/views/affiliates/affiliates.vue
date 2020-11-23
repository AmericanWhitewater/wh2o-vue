<template>
  <div class="Affiliates-table">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col mt-spacing-lg">
          <h1>
            Affiliates
          </h1>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <template v-if="loading">
            loading
          </template>
          <template v-else-if="data">
            <div v-for="(affiliate, index) in data" :key="index" class="mb-spacing-lg">
              <hr>
             <h3> {{ affiliate.name }} </h3>
             <p> {{ affiliate.url }} </p>
             <p> {{ affiliate.abstract }} </p>
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
  name: 'affiliates',
  computed: {
    ...mapState({
      data: state => state.Affiliates.data,
      loading: state => state.Affiliates.loading,
      error: state => state.Affiliates.error
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('Affiliates/getProperty', 'affiliates')
    }
  }
}
</script>
