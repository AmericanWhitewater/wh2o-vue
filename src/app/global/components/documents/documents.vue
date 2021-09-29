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
          <template v-else-if="documents">
           <div v-for="(document, index) in documents" :key="index" class="mb-spacing-lg">
             ::
             <div>{{document.abstract}}</div>
             <div>{{document.document}}</div>
             <div>{{document.short_name}}</div>
             ::
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
  name: 'documents',
  computed: {
    ...mapState({
      data: state => state.Documents.data,
      loading: state => state.Documents.loading,
      error: state => state.Documents.error,
    }),
    documents() {
      if(this.data){
        return this.$store.getters['RiverEvents/documents']
      } else {
        return []
      }
    }
  },
  
  
  created () {
    if (!this.data) {
      this.$store.dispatch('Documents/getProperty', 'documents')
    }
  }
}
</script>