<template>
  <div
    id="nwi-rivers-table"
    kind="standard"
  >
    <template v-if="searchLoading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reaches && reaches.length > 0">
      <div
        class="bx--data-table-container river-index"
      >
        <table class="bx--data-table river-table">
          <thead>
            <tr>
              <th>
                <strong>Name</strong>
                <br>Section
              </th>
              <th>Level</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="reaches && reaches.length > 0">
              <tr
                v-for="reach in reaches"
                :key="reach.properties.id"
                :ref="`reach-${reach.properties.id}`"
                :class="{ active: mouseoveredFeature && reach.properties.id === mouseoveredFeature.properties.id}"
                @mouseover="debouncedMouseover(reach)"
                @mouseleave="debouncedMouseover()"
              >
                <td
                  :class="[`${reach.properties.condition}`, 'river-name-section']"
                  @click.exact="$router.push(`/river-detail/${reach.properties.id}/main`).catch(()=>{})"
                >
                  <strong>{{ displayReachTitle(reach) }}</strong>
                  <br>
                  {{ reach.properties.section }}
                </td>
                <td>{{ displayGaugeReading(reach) }}</td>
                <td>
                  <zoom-in16
                    class="zoom-button"
                    width="21"
                    height="21"
                    @click.exact="centerReach(reach)"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else-if="noReaches">
      <template v-if="showingSearchResults">
        <utility-block
          state="content"
          text="No rivers match your search query."
        />
      </template>
      <template v-else>
        <utility-block
          state="content"
          text="Zoom in on the map to display river details here."
        />
      </template>
    </template>
    <template v-else>
      Error
    </template>
  </div>
</template>

<script>
import { lineString } from '@turf/helpers'
import debounce from 'lodash.debounce'
import ZoomIn16 from '@carbon/icons-vue/lib/zoom--in/16'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Breakpoints } from '@/app/global/services'
import { mapState } from 'vuex'
import { riverIndexActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
export default {
  name: 'nwi-rivers-table',
  components: {
    ZoomIn16,
    UtilityBlock
  },
  props: {
    reachesOnMap: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data: () => ({
    windowWidth: 0,
    mq: Breakpoints
  }),
  computed: {
    ...mapState({
      searchResults: state => state.riverIndexState.riverIndexData.mapSearchResults,
      searchTerm: state => state.riverIndexState.riverIndexData.mapSearchTerm,
      searchLoading: state => state.riverIndexState.riverIndexData.mapSearchLoading,
      mouseoveredFeature: state => state.riverIndexState.riverIndexData.mouseoveredFeature
    }),
    showingSearchResults () {
      return Boolean(this.searchTerm)
    },
    reaches () {
      if (this.showingSearchResults) {
        if (this.searchResults && this.searchResults.length) {
          return this.searchResults.map(x => this.convertSearchResponseToGeoJSON(x))
        }
        return []
      }
      // alphabetize results if they're just displaying from the map
      const alphabetizedReaches = this.reachesOnMap.slice(0).sort((a, b) => {
        const nameA = a.properties.river.toUpperCase()
        const nameB = b.properties.river.toUpperCase()

        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      })
      return alphabetizedReaches
    },
    noReaches () {
      return Boolean(this.reaches && this.reaches.length === 0)
    },
    columns () {
      return ['Reach', 'Difficulty', 'Flow', 'Zoom']
    },
    rowSize () {
      if (this.windowWidth < this.mq.lg) {
        return 'compact'
      }
      return 'standard'
    }

  },
  watch: {
    mouseoveredFeature (feature) {
      if (feature) {
        const reachId = feature.properties.id
        if (
          this.$refs[`reach-${reachId}`] &&
          this.$refs[`reach-${reachId}`].length > 0
        ) {
          scrollIntoView(this.$refs[`reach-${reachId}`][0], {
            scrollMode: 'if-needed',
            block: 'center',
            inline: 'nearest',
            behavior: 'smooth',
            boundary: this.$el
          })
        }
      }
    }
  },
  methods: {
    displayReachTitle (reach) {
      return [reach.properties.river, reach.properties.class].join(' - ')
    },
    displayGaugeReading (reach) {
      if (reach.properties.gage_0_reading) {
        return [parseFloat(reach.properties.gage_0_reading.toFixed(2)), reach.properties.gage_0_unit].join(' ')
      }
      return ''
    },
    viewRiver (id, tab) {
      this.$router
        .push(`/river-detail/${id}/${tab || 'main'}`)
        .catch(() => {})
    },
    mouseoverFeature (feature) {
      this.$store.dispatch(riverIndexActions.MOUSEOVER_FEATURE, feature)
    },
    centerReach (reach) {
      this.$emit('centerReach', reach)
    },
    friendlyCurrentFlow (flow) {
      switch (flow) {
        case 'low':
          return 'low'
        case 'med':
          return 'running'
        case 'high':
          return 'high'
        default:
          return 'n/a'
      }
    },
    // the search endpoint returns a very different looking object
    // than the tileserver, but for all the map centering logic (and table display logic)
    // to work, we need to convert the data here
    convertSearchResponseToGeoJSON (reach) {
      let geom
      if (reach.geom) {
        const coords = reach.geom.split(',').map(x => x.split(' ').map(y => parseFloat(y)))
        geom = lineString(coords).geometry
      }
      const readingSummaryProps = {}
      if (reach.readingsummary) {
        readingSummaryProps.gage_0_id = reach.readingsummary.gauge_id
        readingSummaryProps.gage_0_reading = parseFloat(reach.readingsummary.gauge_reading)
        readingSummaryProps.reading = parseFloat(reach.readingsummary.gauge_reading)
        readingSummaryProps.gage_0_updated = reach.readingsummary.updated
        if (reach.readingsummary.metric) {
          reach.readingsummary.unit = reach.readingsummary.metric.unit
        }
      }

      return {
        type: 'Feature',
        id: undefined,
        _geometry: geom,
        properties: {
          class: reach.class,
          condition: reach.cond,
          id: reach.id,
          river: reach.river,
          section: reach.section,
          altname: reach.altname,
          abstract: reach.abstract,
          ...readingSummaryProps,
          gage_0_name: reach.gauge && reach.gauge.name
        }
      }
    }
  },
  created () {
    this.debouncedMouseover = debounce(this.mouseoverFeature, 200)
  },
  mounted () {
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  }
}
</script>
