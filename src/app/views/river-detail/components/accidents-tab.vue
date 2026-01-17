<template>
  <div class="accidents-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block
            v-if="loading"
            state="loading"
            text="Loading accident data"
          />
        </template>
        <template v-else-if="accidents">
          <div class="bx--data-table-container mb-lg">
            <table class="bx--data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Flow</th>
                  <th>Result</th>
                  <th>Cause</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="accidents.length > 0">
                  <tr v-for="(a, index) in accidents" :key="index">
                    <td v-text="formatDate(a.acf.accident_date, 'll')" />
                    <td v-text="a.acf.relative_water_level" />
                    <!-- TODO: clarify injury_type vs. type_of_injury -->
                    <td v-text="a.acf.injury_type" />
                    <td v-text="a.acf.causes" />
                    <td>
                      <a :href="a.link" target="_blank">
                        <cv-button small kind="tertiary">
                          Full Report
                        </cv-button>
                      </a>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">No Accident Reports</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          <utility-block state="error" />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import { Layout } from "@/app/global/layout";
export default {
  name: "accidents-tab",
  components: {
    UtilityBlock,
    Layout,
  },
  computed: {
    ...mapState({
      loading: (state) => state.RiverAccidents.loading,
      error: (state) => state.RiverAccidents.error,
      accidents: (state) => state.RiverAccidents.data,
      reach: (state) => state.RiverDetail.data,
    }),
    riverId() {
      return parseInt(this.$route.params.id, 10);
    },
  },
  watch: {
    reach: {
      handler(newReach) {
        if (newReach && newReach.wpID) {
          this.$store.dispatch("RiverAccidents/getProperty", newReach.wpID);
        }
      },
      immediate: true,
    },
  },
};
</script>
