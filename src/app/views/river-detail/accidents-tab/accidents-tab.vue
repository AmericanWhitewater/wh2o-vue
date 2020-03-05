<template>
  <div class="accidents-tab">
    <layout :name="!loading && !error ? 'layout-two-thirds' : 'layout-full-width'">
      <template #main>
        <loading-block
          v-if="loading"
          text="Loading accident data"
        />
        <error-block
          v-if="!loading && error"
          title="Accident data unavailable"
          text="please try again later"
        />
        <div
          v-if="!loading && !error"
          class="bx--data-table-container mb-lg"
        >
          <table class="bx--data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Flow</th>
                <th>Result</th>
                <th>Factor</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="accidents.length > 0">
                <tr
                  v-for="(a, index) in accidents"
                  :key="index"
                >
                  <td v-text="'{ date }'" />
                  <td v-text="'{ flow }'" />
                  <td v-text="'{ result }'" />
                  <td v-text="'{ factor }'" />
                  <td>
                    <cv-button
                      small
                      kind="tertiary"
                      @click.exact="viewAccident(a.id)"
                    >
                      Full Report
                    </cv-button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">
                    No Accident Reports
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
      <template #sidebar>
        <div class="sticky">
          <hr>
          <h2 class="mb-spacing-md">
            Submit Accident Report
          </h2>
          <p class="mb-spacing-lg">
            If someone gets hurt on a river, or you read about a whitewater-related injury, please report it to American Whitewater. Don't worry about multiple submissions from other witnesses, as our safety editors will turn multiple witness reports into a single unified accident report.
          </p>
          <cv-button
            size="small"
            kind="secondary"
            @click.exact="$router.push('/accident-database/new-report')"
          >
            Continue to Form
          </cv-button>
        </div>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { accidentsActions } from '../shared/state'
import { accidentDetailActions } from '@/app/views/accident-database/shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { Layout } from '@/app/global/layout'

export default {
  name: 'AccidentsTab',
  components: {
    ErrorBlock,
    LoadingBlock,
    Layout
  },
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.accidentsData.loading,
      error: state => state.riverDetailState.accidentsData.error,
      accidents: state => state.riverDetailState.accidentsData.data
    }),
    riverId () {
      return parseInt(this.$route.params.id, 10)
    }
  },
  methods: {
    loadData () {
      if (!this.accidents && !this.error) {
        this.$store.dispatch(
          accidentsActions.FETCH_ACCIDENTS_DATA,
          this.riverId
        )
      }
    },
    viewAccident (accidentId) {
      this.$store.dispatch(
        accidentDetailActions.GET_ACCIDENT_DETAIL_DATA,
        this.riverId
      )
      this.$router.push(`/accident-database/accident-detail/${accidentId}`).catch(() => {})
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
.accidents-tab {
  padding-top: 2rem;
}
</style>
