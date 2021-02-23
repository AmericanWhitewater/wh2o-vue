<template>
  <div class="flow-chart">
    <canvas ref="chartCanvas" />
  </div>
</template>
<script>
import moment from 'moment'
import { buildChart } from './build-chart'
import { checkWindow } from '@/app/global/mixins'
import { formatReadingWithFormat, getEmptyMetric } from '@/app/global/lib/gages'
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
      default: 'week',
      validator: val => ['day', 'week', 'month', 'year'].indexOf(val) > -1
    },
    readings: {
      type: Array,
      required: true
    },
    metrics:{
      type: Array,
      required: true,
      default: ()=>[],
    }
  },
  data: () => ({
    currentTimeScale: null
  }),
  computed: {
    chartMetric(){
      return this.metrics.find(m => m.id === this.readings[0].metric.toString()) ?? getEmptyMetric()
    },
    chartLabels () {
      return this.readings.map(reading => moment(reading.updated, 'X').format('MM/DD hh:mm a'))
    },
    activeGage () {
      return this.gages.find(gage => Number(gage.gauge.id) === this.readings[0].gauge_id)
    },
    formattedReadings () {
      return this.readings.map(reading => formatReadingWithFormat(parseFloat(reading.reading),this.chartMetric.format))
    },
    chartAspectRatio () {
      if (this.windowWidth >= this.$options.breakpoints.md) {
        return 16/9 // 16:9
      } else {
        return 4/3 // 4:3
      }
    }
  },
  methods: {
    getYMax () {
      return Math.max(...this.formattedReadings) * 1.25
    },

    getTimeScale (timeScale) {
      let start
      switch (timeScale) {
        case 'year':
          start = moment().subtract(1, 'years').unix()
          break
        case 'month':
          start = moment().subtract(1, 'month').unix()
          break
        case 'week':
          start = moment().subtract(1, 'weeks').unix()
          break
        case 'day':
          start = moment().subtract(1, 'days').unix()
          break
        default:
          start = moment().subtract(1, 'days').unix()
          break
      }
      return {
        timeStart: Math.floor(start),
        timeEnd: Math.floor(moment().unix())
      }
    },
    renderChart () {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      const otherthis = this; //refactor later

      const chartOptions = {
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
        aspectRatio: this.chartAspectRatio,
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
          yPadding: 16,
          callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    return( `${label} ${ formatReadingWithFormat(parseFloat(tooltipItem.value),otherthis.chartMetric.format)} ${otherthis.chartMetric.unit}`);
                }
            }

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
              labelString: 'Timescale',
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 14
            },
            bounds: 'data',
            ticks: {
              source: 'data',
              beginAtZero: false,
              autoSkip: true,
              maxTicksLimit: 20,
              maxRotation: 45,
              minRotation: 45,
              labelOffset: 20,
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 13,
              unit: this.timeScales,
              displayFormats: {
                day: 'h:mm A',
                week: 'MM/DD h:mm A',
                month: 'MM/DD',
                year: 'MM/DD/YYYY'
              },
              min: this.getTimeScale(this.readings).timeStart
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.chartMetric.name,
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
              suggestedMax: this.getYMax(),
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 14,
              callback: (value)=>formatReadingWithFormat(parseFloat(value),otherthis.chartMetric.format)
            },
            beforeBuildTicks: () => {
              chartOptions.scales.yAxes[0].ticks.min = 100
            }
          }]
        }

      }

      if (this.formattedReadings && this.activeGage) {
        if (this.activeGage?.rmin && this.activeGage?.rmax) {
          chartOptions.graphRange = {
            min: Number(this.activeGage.rmin),
            max: Number(this.activeGage.rmax),
            colors: {
              low: '#ffc3c2',
              running: '#9bf1bb',
              high: '#a4ecf2'
            }
          }
        }

        buildChart(ctx, this.chartLabels, this.formattedReadings, chartOptions)
      }
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>
