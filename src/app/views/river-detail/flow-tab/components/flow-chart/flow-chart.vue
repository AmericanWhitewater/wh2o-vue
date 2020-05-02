<template>
  <div class="flow-chart">
    <canvas ref="chartCanvas" />
  </div>
</template>
<script>
import moment from 'moment'
import { buildChart } from './build-chart'
import { checkWindow } from '@/app/global/mixins'
export default {
  name: 'flow-chart',
  mixins: [checkWindow],
  props: {
    gages: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    timeScales: {
      type: String,
      required: false,
      default: 'day',
      validator: val => ['day', 'week', 'month', 'year'].indexOf(val) > -1
    },
    readings: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    timeStart: null,
    resolution: null,
    timeEnd: null,
    backgroundRange: false
  }),
  computed: {
    chartLabels () {
      return this.readings.map(reading => moment(reading.updated).format('lll'))
    },
    activeGage () {
      return this.gages.find(gage => Number(gage.gauge.id) === this.readings[0].gauge_id)
    },
    formattedReadings () {
      return this.readings.map(reading => Math.floor(reading.reading))
    },
    chartAspectRatio () {
      if (this.windowWidth >= this.$options.breakpoints.md) {
        return 1.777777777777778 // 16:9
      } else {
        return 1.333333333333333 // 4:3
      }
    }
  },
  methods: {
    setTimeScale (timeScale) {
      let start
      this.resolution = 60 * 60 * 24
      switch (timeScale) {
        case 'year':
          this.resolution = 60 * 60 * 730
          this.timeScale = 'year'
          start = moment().subtract(1, 'years').unix()
          break
        case 'month':
          this.timeScale = 'month'
          this.resolution = 60 * 60 * 24
          start = moment().subtract(1, 'month').unix()
          break

        case 'week':
          this.timeScale = 'week'
          this.resolution = 60 * 60 * 12
          start = moment().subtract(1, 'weeks').unix()
          break
        case 'day':
        default:
          this.resolution = 1
          this.timeScale = 'day'
          start = moment().subtract(1, 'days').unix()
          break
      }
      this.timeStart = Math.floor(start)
      this.timeEnd = Math.floor(moment().unix())
    },
    renderChart (readings) {
      const ctx = this.$refs.chartCanvas.getContext('2d')

      const opts = {
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 2,
            color: '#152935'
          },
          point: {
            radius: 1,
            hitRadius: 16,
            borderColor: 'rgba(0,0,0,0)',
            hoverBackgroundColor: '#152935'
          }
        },
        layout: {
          padding: 0
        },
        responsive: true,
        aspectRatio: 1.777777777777778,
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        tooltips: {
          backgroundColor: '#ffffff',
          bodyFontColor: '#152934',
          bodyFontFamily: "'IBM Plex Sans' , sans-serif",
          bodyFontSize: 22,
          bodyLineHeight: 25,
          bodyFontStyle: 400,
          borderColor: '#DFE3E6',
          borderWidth: 1,
          caretSize: 8,
          cornerRadius: 0,
          displayColors: false,
          enabled: true,
          titleFontColor: '#152934',
          titleFontFamily: "'IBM Plex Sans' , sans-serif",
          titleFontSize: 12,
          titleLineHeight: 15,
          titleFontStyle: 600,
          titleMarginBottom: 4,
          xPadding: 16,
          yPadding: 16
        },
        scales: {
          xAxes: [{
            display: true,
            distribution: 'series',
            gridLines: {
              color: 'rgba(90, 104, 114, 0.2)',
              borderDash: [4, 4]
            },
            scaleLabel: {
              display: true,
              labelString: 'Timespan',
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 14
            },
            bounds: 'data',
            ticks: {
              source: 'data',
              beginAtZero: false,
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
              labelOffset: 20,
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 13,
              min: moment(this.timeStart).format('ll')
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Metric [ ]',
              bounds: 'data',
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 14
            },
            gridLines: {
              color: 'rgba(90, 104, 114, 0.2)',
              borderDash: [4, 4]
            },
            ticks: {
              beginAtZero: true,
              // suggestedMax: yMax,
              fontFamily: "'IBM Plex Sans' , 'sans-serif'"

            },
            beforeBuildTicks: axis => {
              opts.scales.yAxes[0].ticks.min = 100
            }
          }]
        }

      }

      if (this.formattedReadings && this.activeGage) {
        if (this.activeGage?.rmin && this.activeGage?.rmax) {
          opts.graphRange = {
            min: Number(this.activeGage.rmin),
            max: Number(this.activeGage.rmax),
            colors: {
              low: '#FF8785',
              running: '#59E78D',
              high: '#68DFE9'
            }
          }
        }

        buildChart(ctx, this.chartLabels, this.formattedReadings, opts)
      }
    }
  },
  mounted () {
    this.renderChart(this.readings)
  }
}
</script>
