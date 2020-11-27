<template>
  <div class='report-detail'>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header v-if="loading && !data" class="bx--tile">
              <div>
                <cv-skeleton-text />
                <cv-skeleton-text heading />
                <cv-breadcrumb-skeleton no-trailing-slash />
              </div>
            </header>
          <header v-else-if="data" class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md"> {{ data.title || 'Untitled Report' }} </h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/trip-reports"> Trip Reports </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Report Detail </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div>
              <cv-button size="small"> Edit Report </cv-button>
            </div>
          </header>
          <header v-else class="bx--tile">
              <div>
                <h4>Error</h4>
                <h1 class="mb-spacing-md">Something went wrong</h1>
              </div>
            </header>
          <utility-block
            text="No geospatial data available"
            state="content"
            theme="dark"
          />
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <p v-if="data">
            {{ data.detail || 'Detail Unavailable' }}
          </p>
        </div>
        <div class="bx--col">
          table
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { UtilityBlock } from "@/app/global/components";
import {mapState} from "vuex"
export default {
  name: "report-detail",
  components: {
    UtilityBlock
  },
  computed: {
    ...mapState({
      data: state => state.ReportDetail.data,
      loading: state => state.ReportDetail.loading,
      refId: state => state.ReportDetail.refId,
    }),
    reportId() {
      return this.$route.params.id
    }
  },
  created() {
    if(!this.data || (this.reportId !== this.refId)) {
      this.$store.dispatch('ReportDetail/setRefId', this.reportId)
      this.$store.dispatch('ReportDetail/getProperty', this.reportId)
    }
  }
};
</script>