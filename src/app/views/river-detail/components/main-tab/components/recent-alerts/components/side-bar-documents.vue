<template>
  <div class="sidebar-documents">
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
    <template v-else-if="documents && documents.length > 0">
      <div
        v-for="(document, i) in documents.slice(0, 1)"
        :key="i + 3 * 4"
        class="bx--row mb-spacing-xs sidebar-document"
      >
        <div class="bx--col-sm-12 bx--col-md-5">
          <div class="pt-spacing-sm pb-spacing-md">
            <cv-link :href="document.document">
              <h5
                class="mb-spacing-2xs"
              >
                {{ $titleCase(documents.short_name) }}
              </h5>
            </cv-link>

            <div
              v-if="document.abstract.length > 200"
              ref="abstract"
              class="abstract-content"
            
            >
              <span v-html="document.abstract.slice(0, 200)"/>
              <cv-link 
                :href="document.document"
                class="read-more">
                ... Read More
              </cv-link>
            </div>
            <div
              v-else
              ref="abstract"
              class="abstract-content"
              v-html="document.document"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="no-documents-msg">
        No Documents.
      </p>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebar-documents',
  computed: {
    ...mapState({
      loading: state => state.RiverEvents.loading,
      error: state => state.RiverEvents.error,
      documents: state => state.RiverEvents.documents
    })
  },
  watch: {
    documents () {
      this.$emit('documents:change')
    }
  }
}
</script>
