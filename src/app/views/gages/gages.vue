<template>
  <div class='Gages-table'>
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
            <div class="bx--col-xs-12 bx--col-sm-4 bx--col-lg-6" v-for="(gage, index) in data" :key="index">
            <resource-card :key="index" :title="gage.name" :to="`/gage-detail/${gage.id}`" />
           <!-- <div v-for="(project, index) in data.rows" :key="index">
             <h3> {{ project.name }} </h3>
             <p> {{ project.description }} </p>
           </div> -->
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
import {mapState} from 'vuex'
import {ResourceCard} from '@/app/global/components'
export default {
  name: "Gages",
  components: {
    ResourceCard
  },
  computed: {
    ...mapState({
      data: state => state.Gages.data,
      loading: state => state.Gages.loading,
      error: state => state.Gages.error,
    })
  },
  created() {
    if(!this.data) {
      this.$store.dispatch('Gages/getProperty','gage-headers')
    }
  }
};
</script>
