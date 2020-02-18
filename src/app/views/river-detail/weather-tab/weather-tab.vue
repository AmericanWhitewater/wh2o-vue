<template>
  <div class="weather-tab">
    <template v-if="!loading && !error">
      <div class="bx--row mb-md">
        <div class="bx--col-lg-16 mb-spacing-lg">
          <h2>Currently</h2>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Summary'"
          />
          <h4 v-text="weather.currently.summary" />
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Temperature'"
          />
          <h4>{{ weather.currently.temperature }}&deg;</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Nearest Storm Distance'"
          />
          <h4>{{ weather.currently.nearestStormDistance }} mi</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Nearest Storm Bearing'"
          />
          <h4>{{ weather.currently.nearestStormBearing }} &deg;</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Wind Speed'"
          />
          <h4>{{ weather.currently.windSpeed }} mph</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Wind Gust'"
          />
          <h4>{{ weather.currently.windGust }}mph</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Wind Bearing'"
          />
          <h4>{{ weather.currently.windBearing }} &deg;</h4>
        </div>
        <div class="bx--col-lg-4 mb-spacing-md">
          <label
            class="bx--label"
            v-text="'Cloud Cover'"
          />
          <h4>{{ Math.floor(weather.currently.cloudCover * 100) }}%</h4>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col-lg-16 mb-spacing-lg">
          <hr>
          <h2>Daily</h2>
          <p v-text="dailyReadings.summary" />
        </div>
        <div
          v-for="(r, index) in dailyReadings"
          :key="index"
          class="bx--col-sm-6 bx--col-md-4 bx--col-lg-4 mb-spacing-md daily-tiles"
        >
          <cv-tile kind="standard">
            <h6 class="expressive-heading-01">
              today + {{ index + 1 }}
            </h6>
            <p>{{ r.summary }}</p>
            <hr>
            <label
              class="bx--label"
              v-text="'Precipitation'"
            />
            <h4 class="mb-spacing-sm">
              {{ Math.floor(r.precipProbability * 100) }}% chance of
              {{ r.precipType }}
            </h4>
            <label
              class="bx--label"
              v-text="'Hi Temp'"
            />
            <h4 class="mb-spacing-sm">
              {{ r.apparentTemperatureHigh }}
            </h4>
            <label
              class="bx--label"
              v-text="'Lo Temp'"
            />
            <h4>{{ r.apparentTemperatureLow }}</h4>
          </cv-tile>
        </div>
      </div>
    </template>
    <template v-if="loading">
      <loading-block text="Loading weather..." />
    </template>
    <template v-if="loading && !error">
      <loading-block text="Loading weather..." />
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Weather unavailable"
        text="please try again later"
      />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { weatherActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'

export default {
  name: 'WeatherTab',
  components: {
    LoadingBlock,
    ErrorBlock
  },
  data: () => ({
    fetchConfig: {
      lat: null,
      lon: null
    }
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      loading: state => state.riverDetailState.weatherData.loading,
      weather: state => state.riverDetailState.weatherData.data,
      error: state => state.riverDetailState.weatherData.error
    }),
    plat () {
      return this.river.plat
    },
    plon () {
      return this.river.plon
    },
    dailyReadings () {
      return this.weather.daily.data
    }
  },
  created () {
    this.fetchConfig.lat = this.river.plat
    this.fetchConfig.lon = this.river.plon
    this.loadWeather()
  },
  methods: {
    loadWeather () {
      if (!this.weather) {
        // need to load when the routeId has changed.
        this.$store.dispatch(
          weatherActions.FETCH_WEATHER_DATA,
          this.fetchConfig
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.weather-tab {
  padding-top: 2rem;
}

.bx--label {
  margin: 0;
  margin-bottom: 0;
}

.daily-tiles {
  h6 {
    font-weight: bolder;
  }
  hr {
    border-top: 1px solid $ui-05;
    width: 100%;
  }
}
</style>
