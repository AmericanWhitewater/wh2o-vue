<template>
  <cv-toolbar id="nwi-map-toolbar">
    <nwi-toolbar-search
      v-if="controlEnabled('search')"
      v-model="searchInput"
      placeholder="Search for a river"
    />

    <template v-if="controlEnabled('baseMap')">
      <span class="dropdown-label bx--btn bx--btn--primary">Base map:</span>
      <cv-dropdown
        v-model="currentBaseMap"
        inline
        label="Basemap"
      >
        <cv-dropdown-item value="topo">
          Topo
        </cv-dropdown-item>
        <cv-dropdown-item value="satellite">
          Satellite
        </cv-dropdown-item>
      </cv-dropdown>
    </template>

    <template v-if="controlEnabled('color')">
      <span class="dropdown-label bx--btn bx--btn--primary">Color by:</span>
      <cv-dropdown
        v-model="currentColorBy"
        inline
        label="Color by"
      >
        <cv-dropdown-item value="difficulty">
          Difficulty
        </cv-dropdown-item>
        <cv-dropdown-item value="currentFlow">
          Current Flow
        </cv-dropdown-item>
      </cv-dropdown>
    </template>

    <template v-if="controlEnabled('fullscreen')">
      <cv-button @click="toggleFullscreen">
        {{ fullscreen ? "Exit Fullscreen" : "Fullscreen" }}
        <ScreenOff20
          v-if="fullscreen"
          class="bx--btn__icon bx--toolbar-filter-icon"
        />
        <Screen20
          v-else
          class="bx--btn__icon bx--toolbar-filter-icon"
        />
      </cv-button>
    </template>
  </cv-toolbar>
</template>

<script>
import debounce from 'lodash.debounce'
import ScreenOff20 from '@carbon/icons-vue/lib/screen--off/20'
import Screen20 from '@carbon/icons-vue/lib/screen/20'
import NwiToolbarSearch from './nwi-toolbar-search.vue'
import screenfull from 'screenfull'
import { httpClient } from '@/app/global/services'
export default {
  name: 'nwi-map-controls',
  components: {
    ScreenOff20,
    Screen20,
    NwiToolbarSearch
  },
  props: {
    colorBy: {
      type: String,
      required: true
    },
    baseMap: {
      type: String,
      required: true
    },
    idForFullScreen: {
      type: String
    },
    mapControls: {
      type: Array,
      default: () => ['search', 'baseMap', 'color', 'fullscreen']
    }
  },
  data () {
    return {
      currentBaseMap: this.baseMap,
      currentColorBy: this.colorBy,
      searchInput: '',
      testCheckbox: false,
      minSearchLength: 3,
      fullscreen: false,
      searchResults: false
    }
  },
  watch: {
    currentBaseMap (newVal) {
      this.$emit('baseMap', newVal)
    },
    currentColorBy (newVal) {
      this.$emit('colorBy', newVal)
    },
    searchResults (newVal) {
      this.$emit('searchResults', newVal)
      this.$emit('loading', false)
    },
    searchInput (newVal, oldVal) {
      this.debouncedTriggerSearch(newVal, oldVal)
    }
  },
  methods: {
    async search (query) {
      if (!query) {
        this.searchResults = []
      } else {
        this.$emit('loading', true)
        // TODO: remove cors anywhere proxy
        const response = await httpClient.get('/content/River/search/.json', {
          params: {
            state: '', // required for some reason
            river: query
          }
        })
        // TODO: once reaches have geoms, we could add `geom` to the search endpoint
        // response and skip the extra step of filtering the map then querying the map
        this.searchResults = response.data.map(river => river.id)
      }
    },
    controlEnabled (control) {
      return this.mapControls.includes(control)
    },
    toggleFullscreen () {
      screenfull.toggle(document.getElementById(this.idForFullScreen))
    },
    triggerSearch (newVal, oldVal) {
      // only emit search query if someone has typed a meaningful # of letters
      if (newVal.length >= this.minSearchLength) {
        this.search(newVal)
      } else if (oldVal.length >= this.minSearchLength) {
        // only trigger if we're clearing an old search
        this.searchResults = false
      }
    }
  },
  created () {
    this.debouncedTriggerSearch = debounce(this.triggerSearch, 500)
  },
  mounted () {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        this.fullscreen = screenfull.isFullscreen
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#nwi-map-toolbar {
  position: absolute;
  top: 0;
  margin-top: 0;
  width: 100%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.7);

  @include carbon--breakpoint('md') {
    width: 68%;
  }

  @include MQ(XXL) {
    width: 76%;
  }
}

.bx--dropdown {
  width: auto;
  order: unset;
}

.dropdown-label {
  cursor: unset;
  display: none;

  @include carbon--breakpoint('lg') {
    display: inline-flex;
  }
}
</style>
