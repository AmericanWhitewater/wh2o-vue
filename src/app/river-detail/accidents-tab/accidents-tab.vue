<template>
  <div class="accidents-tab">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <template v-if="loading">
            <loading-block text="Loading accident data" />
          </template>
          <template v-if="!loading && error">
            <error-block
              title="Accident data unavailable"
              text="please try again later"
            />
          </template>
          <template v-if="!loading && !error">
            <div class="bx--data-table-container">
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
                  <tr v-for="(a, index) in accidents" :key="index">
                    <td v-text="'{ date }'" />
                    <td v-text="'{ flow }'" />
                    <td v-text="'{ result }'" />
                    <td v-text="'{ factor }'" />
                    <td>
                      <cv-button
                        small
                        kind="tertiary"
                        @click="viewAccident(a.id)"
                      >
                        Full Report
                      </cv-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="bx--col">
          Submit form
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { accidentsActions } from "../shared/state";
import { accidentDetailActions } from "@/app/accident-database/shared/state";
import { LoadingBlock, ErrorBlock } from "@/app/global/components";
import { mapState } from "vuex";
export default {
  name: "AccidentsTab",
  components: {
    ErrorBlock,
    LoadingBlock
  },
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.accidentsData.loading,
      error: state => state.riverDetailState.accidentsData.error,
      accidents: state => state.riverDetailState.accidentsData.data
    }),
    riverId() {
      return parseInt(this.$route.params.id);
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (!this.accidents && !this.error) {
        this.$store.dispatch(
          accidentsActions.FETCH_ACCIDENTS_DATA,
          this.riverId
        );
      }
    },
    viewAccident(accidentId) {
      this.$store.dispatch(
        accidentDetailActions.GET_ACCIDENT_DETAIL_DATA,
        this.riverId
      );
      this.$router.push(`/accident-database/${accidentId}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.accidents-tab {
  padding-top: 2rem;
}
</style>
