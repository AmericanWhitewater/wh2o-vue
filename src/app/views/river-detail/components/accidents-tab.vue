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
          <page-description
            description="If someone gets hurt on a river, or you read about a whitewater-related injury, please report it to American Whitewater. Don't worry about multiple submissions from other witnesses, as our safety editors will turn multiple witness reports into a single unified accident report."
          >
          <!-- TODO: add link to new accident form !-->
            <cv-button
              kind="secondary"
              size="small"
              @click="goToLink(formatLinkUrl('/content/Accident/report/?'))"
            >
              Submit Report
            </cv-button>
          </page-description>
          <div
            class="bx--data-table-container mb-lg"
          >
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
                  <tr
                    v-for="(a, index) in accidents"
                    :key="index"
                  >
                    <td v-text="formatDate(a.date, 'll')" />
                    <td v-text="a['water-level'].join(', ')" />
                    <td v-text="a['injury-type'].join(', ')" />
                    <td v-text="a['cause-code'].join(', ')" />
                    <td>
                      <a :href="a.link" target="_blank">
                        <cv-button
                          small
                          kind="tertiary"
                        >
                          Full Report
                        </cv-button>
                      </a>
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
        <template v-else>
          <utility-block state="error" />
        </template>
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
            @click="goToLink(formatLinkUrl('/content/Accident/report/?'))"
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
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { Layout } from '@/app/global/layout'
import { PageDescription } from '@/app/global/components'
export default {
  name: 'accidents-tab',
  components: {
    UtilityBlock,
    Layout,
    PageDescription
  },
  computed: {
    ...mapState({
      loading: state => state.RiverAccidents.loading,
      error: state => state.RiverAccidents.error,
      accidents: state => state.RiverAccidents.data,
      reach: state => state.RiverDetail.data
    }),
    riverId () {
      return parseInt(this.$route.params.id, 10)
    }
  },
  watch: {
    reach: {
      handler (newReach) {
        if (newReach && newReach.wpID) {
          this.$store.dispatch(
            'RiverAccidents/getProperty',
            newReach.wpID
          );
        }
      },
      immediate: true
    }
  },
}
</script>
