<template>
  <div
    id="nwi-rivers-table"
    kind="standard"
  >
    <template v-if="loading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reaches && reaches.length > 0">
      <div
        ref="table-container"
        class="bx--data-table-container river-index"
        :style="`max-height:calc(100vh - ${Math.floor(tableTop) + 25 }px)`"
      >
        <table class="bx--data-table river-table">
          <thead>
            <tr>
              <th>
                <strong>Name</strong>
                <br>Section
              </th>
              <th>Class/Grade</th>
              <th>
                Flow Reading
              </th>
              <th>&nbsp;</th>
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
                  :class="[`${reach.properties.condition}`,, 'river-name-section']"
                  @click.exact="$router.push(`/river-detail/${reach.properties.id}/main`).catch(()=>{})"
                >
                  <strong>{{ reach.properties.river }}</strong>
                  <br>
                  {{ reach.properties.section }}
                </td>
                <td>{{ reach.properties.class }}</td>
                <td>{{ friendlyCurrentFlow(reach.properties.condition) }}</td>
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
          text="No rivers in the viewport match your search query."
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
    reaches: {
      type: Array,
      required: true
    },
    showingSearchResults: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    windowWidth: 0,
    mq: Breakpoints,
    loading: false,
    tableTop: null
  }),
  computed: {
    ...mapState({
      mouseoveredFeature: state => state.riverIndexState.riverIndexData.mouseoveredFeature
    }),
    noReaches () {
      return this.reaches && this.reaches.length === 0
    },
    columns () {
      return ['Reach', 'Difficulty', 'Flow', 'Zoom']
    },
    rowSize () {
      if (this.windowWidth < this.mq.lg) {
        return 'compact'
      }
      return 'standard'
    },
    mouseoveredClass (reachId) {
      if (
        this.mouseoveredFeature &&
        reachId === this.mouseoveredFeature.properties.id
      ) {
        return 'active'
      }
      return ''
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
            block: 'nearest',
            inline: 'nearest',
            behavior: 'smooth'
          })
        }
      }
    }
  },
  methods: {
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
    }
  },
  created () {
    this.debouncedMouseover = debounce(this.mouseoverFeature, 200)
  },
  mounted () {
    this.tableTop = this.$refs['table-container'].getClientRects()[0].top
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  }
}
</script>

<style lang="scss">
.bx--data-table-container {
  overflow-y: scroll;
  z-index: 2;

  // this is mimicking :hover behaviour that already exists
  .bx--data-table tbody tr.active {
    td {
      background: #e5e5e5;
      &:nth-child(1) {
        border-left-width: 1.5rem;
      }
    }
  }

  &.river-index {
    min-height:calc(100vh - 236px);
    background-color:$ui-02;
    max-height:calc(100vh - 261px);
  }
  &.river-detail {
    @include carbon--breakpoint("md") {
      width: 32%;
      height: 100%;
    }
    @include carbon--breakpoint("max") {
      width: 24%;
    }
  }
}
</style>
