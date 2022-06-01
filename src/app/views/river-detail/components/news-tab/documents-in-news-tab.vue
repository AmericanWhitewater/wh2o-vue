<template>

        <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <hr >
        <h2 class="mb-spacing-md">Documents</h2>
        <template v-if="documentsLoading && !documents">
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
                      <h4> {{ document.title }} </h4>
                      <div class="bx--type-caption">
                        {{ document.edit_date }}
                        <template v-if="document.author">
                          - {{ document.author.name }}
                        </template>
                      </div>
                      <hr>
                    </div>

                  </header>
                  <main class="document-detail">
                    <p v-if="document.abstract" v-text="document.abstract.slice(0, 300)" />
                    <p v-else>This document has no message</p>
                  </main>
                  <form method="get" :action="document.uri">
                  <cv-button >download</cv-button>
                  </form>

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
    UtilityBlock
  },
  computed: {
    ...mapState({
      data:(state) => state.RiverEvents.data,
      documentsLoading: (state) => state.RiverEvents.loading,
      documentsError: (state) => state.RiverEvents.error,

    }),
    documents() {
      if(this && this.data){
        return this.$store.getters['RiverLinker/documents']
      } else {
        return []
      }
    },
  },
  created() {

      if (!this.documents) {
        this.$store.dispatch("RiverLinker/getProperty", this.$route.params.id);
      }
  },
};
</script>
<style lang="scss" scoped>

</style>
