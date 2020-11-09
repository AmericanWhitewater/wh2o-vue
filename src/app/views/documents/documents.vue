<template>
  <div class="Documents-table">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <h1>
            Documents
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
import { mapState } from 'vuex'
export default {
  name: 'documents',
  computed: {
    ...mapState({
      data: state => state.Documents.data,
      loading: state => state.Documents.loading,
      error: state => state.Documents.error
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('Documents/getProperty', 'documents')
    }
  }
}
</script>
