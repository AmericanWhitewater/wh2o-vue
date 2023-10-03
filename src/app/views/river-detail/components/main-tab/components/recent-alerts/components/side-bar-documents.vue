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
            <cv-link :href="document.link">
              <h5
                class="mb-spacing-2xs"
                v-text="document.title.rendered"
              />
            </cv-link>

            <div
              ref="abstract"
              class="abstract-content"
              v-html="document.excerpt.rendered"
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

import { mapState } from 'vuex'
export default {
  name: 'sidebar-documents',
  computed: {
    ...mapState({
      documents: state => state.RiverDocuments.data,
      loading: state => state.RiverDocuments.loading
    }),
    // TODO: the existing interface here only showed one document.
    // We may want to reassess the UX and display multiple ones since
    // we're displaying multiple of everything else...
    document() {
      return this.documents[0]
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch('RiverDocuments/getProperty', this.$route.params.id)
    },
  }

}
</script>
