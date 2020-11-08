<template>
  <div class='Affiliates-table'>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
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
            {{ data }}
           <!-- <div v-for="(project, index) in data.rows" :key="index">
             <h3> {{ project.name }} </h3>
             <p> {{ project.description }} </p>
           </div> -->
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
import {mapState} from 'vuex'
export default {
  name: "Affiliates",
  computed: {
    ...mapState({
      data: state => state.Affiliates.data,
      loading: state => state.Affiliates.loading,
      error: state => state.Affiliates.error,
    })
  },
  created() {
    if(!this.data) {
      this.$store.dispatch('Affiliates/getProperty','affiliates')
    }
  }
};
</script>
