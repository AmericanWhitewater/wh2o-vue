<template>
  <div class="sidebar-documents bx--col-sm-12 bx--col-md-4">
    <span class="header-row">
      <h4 class="mb-spacing-sm">Documents</h4>
    </span>
    <template v-if="loading">
      <div class="pb-spacing-md">
        <cv-inline-loading
          id="cv-inline-loading--documents"
          state="loading"
        />
      </div>
    </template>
    <template v-else-if="document">

        <div>
          <div class="pt-spacing-sm pb-spacing-md">
            <cv-link :href="document.uri">
              <h5
                class="mb-spacing-2xs"
              >
                {{ $titleCase(document.title) }}
              </h5>
            </cv-link>

            <div
              v-if="document.abstract.length > 200"
              ref="abstract"
              class="abstract-content"
            
            >
              <span v-html="document.abstract.slice(0, 200)"/>
              ...
              <div
                v-if="document.isOnlyDocument"
                action-label="See More Articles"
                @action="$router.push(`/river-detail/${$route.params.id}/news`)"
              />
              <div
                v-else
                action-label="See More Articles"
                @action="$router.push(`/river-detail/${$route.params.id}/news`)"
              />
            </div>
            <div
              v-else
              ref="abstract"
              class="abstract-content"
              v-html="formatURI(document.document)"
            />
          </div>
        </div>
       <cv-button
        kind="secondary"
        size="small"
        class="mb-spacing-sm"
        :disabled="loading"
        @click.exact="$router.push(`/river-detail/${$route.params.id}/news`)"
      >
        See More
      </cv-button>

    </template>
    <template v-else>
      <p class="no-documents-msg">
        No Documents.
      </p>
    </template>
  </div>
</template>
<script>


import { baseUrl } from "@/app/environment";

import { mapState } from 'vuex'
export default {
  name: 'sidebar-documents',
  computed: {
      ...mapState({
      loading: state => state.RiverEvents.loading,
      error: state => state.RiverEvents.error,
    }),
    document() {
      const allDocuments = this.$store.getters['RiverEvents/documents']
      if(allDocuments.length === 1){
        return {...allDocuments[0], isOnlyDocument: true}
      }
      const withTitle = allDocuments.find(document => document.title)
      if(withTitle !== undefined){
        return withTitle
      }
      const withAbstract = allDocuments.find(document => document.abstract)
      if(withAbstract !== undefined){
        return withAbstract
      }
      const withUri = allDocuments.find(document => document.uri)
      if(withUri !== undefined){
        return withUri
      }
      const lastResort = allDocuments.find(document => !(document && Object.keys(document).length === 0 && document.constructor === Object))
      if(lastResort){
        return lastResort
      }
      return null
    },
  },
  methods: {
    loadData () {
      this.$store.dispatch('RiverEvents/getProperty', this.$route.params.id)
    },
    formatURI(input) {
      if (input) {
        return `${baseUrl}${input}`;
      }
      return null;
    },
  }
  
}
</script>
