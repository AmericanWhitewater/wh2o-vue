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
            <div v-for="(document, index) in data" :key="index" class="mb-spacing-lg">
              <hr>
             <p> {{ document.uri }} </p>
             <p> {{ document.description }} </p>
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
      error: state => state.Documents.error
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('RiverLinker/getProperty', 'documents')
    }
  }
}
</script>
