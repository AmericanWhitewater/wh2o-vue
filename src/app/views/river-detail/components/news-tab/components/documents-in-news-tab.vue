<template>
  <layout name="layout-full-width" class="mb-lg">
    <template #main>
      <hr>
      <h2 class="mb-spacing-md">Documents</h2>
      <template v-if="loading">
        <utility-block
          class="documents-loading"
          state="loading"
          text="loading documents"
        />
      </template>
      <template v-else-if="documents && documents.length > 0">
        <div class="bx--row">
          <div
            v-for="(document, index) in documents"
            :key="index"
            class="bx--col-sm-12 bx--col-lg-8 mb-spacing-md"
          >
            <cv-tile>
              <div class="document-wrapper">
                <header class="bx--row">
                  <div class="bx--col-sm-12 bx--col-md-8 mb-spacing-xs">
                    <h4>{{ document.title.rendered }}</h4>
                    <div class="bx--type-caption">
                      <span>
                        {{ formatDate(document.date) }}
                        {{ (document.date && document.author) ? ' - ' : '' }}
                        {{ document.author }}
                      </span>
                    </div>
                    <hr>
                  </div>
                </header>
                <main class="document-detail">
                  <p v-if="document.excerpt.rendered" v-html="document.excerpt.rendered" />
                  <p v-else>This document has no description.</p>
                </main>
                <footer class="document-card-footer">
                  <cv-link :href="document.link">
                    <cv-button kind="primary" size="small">View</cv-button>
                  </cv-link>
                </footer>
              </div>
            </cv-tile>
          </div>
        </div>
      </template>
      <template v-else>
        <utility-block
          class="documents-empty"
          state="content"
          text="No documents"
        />
      </template>
    </template>
  </layout>
</template>

<script>
import { mapState } from "vuex";
import { Layout } from "@/app/global/layout";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";

export default {
  name: "documents-in-news-tab",
  components: {
    Layout,
    UtilityBlock,
  },
  computed: {
    ...mapState({
      documents: (state) => state.RiverDocuments.data,
      loading: (state) => state.RiverDocuments.loading
    }),
  },
  methods: {
    documentUrl(document) {
      return `/content/Document/view/?id=${document.id}`;
    },
  },
  created() {
    if (!this.documents) {
      this.$store.dispatch("RiverDocuments/getProperty", this.$route.params.id);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
