<template>
  <section
    class="reports-section"
  >
    <hr>
    <h2 class="mb-spacing-md">
      Trip Reports
    </h2>
    <template v-if="user">
      <cv-button
        id="new-report"
        kind="secondary"
        size="small"
        class="mb-spacing-xl"
        :disabled="loading"
        @click.exact="navigateToNewReportForm"
      >
        + New Report
      </cv-button>
    </template>
    <template v-else>
      <login-button
        buttonClass="mb-spacing-xl"
        buttonText="Log in to add a report"
      />
    </template>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reports && reports.length">
      <report-preview
        v-for="(item, index) in reports"
        :key="index"
        :report="item"
      />
      <div v-if="moreReportsExist" class="see-more-container">
        <cv-button
          kind="secondary"
          size="small"
          @click.exact="$router.push(`/river-detail/${$route.params.id}/reports`)"
        >
          See more...
        </cv-button>
      </div>
    </template>
    <template v-else-if="error">
      <utility-block state="error" />
    </template>
    <template v-else>
      <utility-block state="content" text="No reports"/>
    </template>
  </section>
</template>

<script>
import { LoginButton, UtilityBlock } from '@/app/global/components';
import { getReachReports } from '@/app/services'
import { mapState } from 'vuex'
import { ReportPreview } from "@/app/views/river-detail/components/reports-tab/components";

import moment from 'moment';

export default {
  name: 'reports-section',
  components: {
    LoginButton,
    UtilityBlock,
    ReportPreview
  },
  data: () => ({
    reports: [],
    loading: true,
    moreReportsExist: false,
    error: false
  }),
  computed: {
    ...mapState({
      user: state => state.User.data
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  watch: {
    reachId: {
      immediate: true,
      handler: function () {
        this.loadReports();
      }
    }
  },
  methods: {
    navigateToNewReportForm () {
      if (!this.user) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Please Log In',
          kind: 'info'
        })
      } else {
        this.$router.push({ name: 'new-report' })
      }
    },
    async loadReports () {
      this.loading = true

      const result = await getReachReports(this.reachId, { perPage: 3, page: 1 })

      if (!result.errors) {
        result.data.posts.data.forEach((report) => {
          report.photos.sort((a,b) => (moment(a.created_at) - moment(b.created_at)));
        });
        this.moreReportsExist = (result.data.posts.paginatorInfo.total > result.data.posts.paginatorInfo.perPage)
        this.reports = result.data.posts.data
      } else {
        this.error = true
      }

      this.loading = false
    },
  }
}
</script>

<style lang="scss">
div.see-more-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
