<template>
  <cv-tile
    id="nwi-rivers-table"
    kind="standard"
  >
    <template v-if="loading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reaches">
      <cv-data-table
        :columns="columns"
        borderless
        :row-size="rowSize"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="reach in reaches"
            :key="reach.properties.id"
            :ref="`reach-${reach.properties.id}`"
            :class="[
              friendlyCurrentFlow(reach.properties.condition),
              highlightedClass(reach.properties.id)
            ]"
            @mouseover.native="debouncedHighlight(reach)"
          >
            <cv-data-table-cell>
              <router-link
                :to="`/river-detail/${reach.properties.id}/main`"
                class="reach-link"
              >
                <h3 class="bx--type-zeta">
                  {{ reach.properties.river }}
                </h3>
                <span class="section bx--type-caption">{{
                  reach.properties.section
                }}</span>
              </router-link>
            </cv-data-table-cell>
            <cv-data-table-cell>{{ reach.properties.class }}</cv-data-table-cell>
            <cv-data-table-cell>
              {{ friendlyCurrentFlow(reach.properties.condition) }}
            </cv-data-table-cell>
            <cv-data-table-cell>
              <zoom-in16
                class="zoom-button"
                width="21"
                height="21"
                @click="centerReach(reach)"
              />
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
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
  </cv-tile>
</template>

<script>
import debounce from 'lodash.debounce'
import ZoomIn16 from '@carbon/icons-vue/lib/zoom--in/16'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Breakpoints } from '@/app/global/services'
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
    highlightedFeature: {
      type: Object,
      required: false,
      default: null
    },
    showingSearchResults: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    windowWidth: 0,
    mq: Breakpoints,
    loading: false
  }),
  computed: {
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
    }
  },
  watch: {
    highlightedFeature (feature) {
      if (feature) {
        const reachId = feature.properties.id
        if (
          this.$refs[`reach-${reachId}`] &&
          this.$refs[`reach-${reachId}`].length > 0
        ) {
          scrollIntoView(this.$refs[`reach-${reachId}`][0].$el, {
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
    highlightedClass (reachId) {
      if (
        this.highlightedFeature &&
        reachId === this.highlightedFeature.properties.id
      ) {
        return 'active'
      }
      return ''
    },
    highlightFeature (reach) {
      this.$emit('highlightFeature', reach)
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
    this.debouncedHighlight = debounce(this.highlightFeature, 200)
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

<style lang="scss">
#nwi-rivers-table {
  // background-color: $ui-02;
  border: none;
  bottom: 0;
  right: 0;
  padding: 0;
  overflow-y: scroll;
  z-index: 2;
  width: 100%;
  height: 100%;

  @include carbon--breakpoint("md") {
    height: 100%;
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

  table.bx--data-table,
  .bx--data-table-container {
    min-width: unset;
  }

  .no-reaches-notice {
    height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .zoom-button {
    cursor: pointer;
  }

  /* matching https://unpkg.com/carbon-components@9.91.4/scss/components/data-table-v2/_data-table-v2-core.scss
  td:hover directive */
  tr {
    td {
      padding: $spacing-sm;
    }

    &.active {
      td {
        background-color: rgba($brand-02, 0.1);
        border-bottom: 1px solid $brand-01;
        border-top: 1px solid $brand-01;

        &:first-of-type {
          border-left: 1px solid $brand-01;
        }

        &:last-of-type {
          border-right: 1px solid $brand-01;
        }
      }
    }
  }

  .low {
    background: rgba(255, 134, 132, 0.7);
  }
  .high {
    background: rgba(93, 172, 225, 0.7);
  }
  .running {
    background: rgba(89, 230, 141, 0.7);
  }
  .bx--data-table-container,
  .bx--data-table {
    overflow-x: unset;
    min-width: unset;
    padding: 0;
  }
  .bx--table-toolbar {
    display: none;
  }
  a.reach-link {
    color: $text-01;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    .section {
      text-decoration: none !important;
    }
  }
}
</style>
