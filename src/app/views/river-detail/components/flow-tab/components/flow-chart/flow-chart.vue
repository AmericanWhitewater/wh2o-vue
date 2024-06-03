<template>
  <div class="flow-chart">
    <canvas ref="chartCanvas" />
  </div>
</template>
<script>
import moment from 'moment'
import Decimal from 'decimal.js';
import { buildChart } from './build-chart'
import { checkWindow } from '@/app/global/mixins'
import { classToColor } from '@/app/global/lib/gages'
export default {
  name: 'flow-chart',
  mixins: [checkWindow],
  props: {
    gaugeCorrelation: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    timeScale: {
      type: String,
      required: false,
      default: 'week',
      validator: val => ['24h', 'week', 'year'].indexOf(val) > -1
    },
    readings: {
      type: Array,
      required: true
    },
    metric: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    currentTimeScale: null
  }),
  computed: {
    chartLabels () {
      return this.readings.map(reading => moment(reading.dateTime).format('MM/DD hh:mm a'))
    },
    chartAspectRatio () {
      if (this.windowWidth >= this.$options.breakpoints.md) {
        return 16/9 // 16:9
      } else {
        return 4/3 // 4:3
      }
    },
    correlationDetails() {
      return this.gaugeCorrelation?.correlationDetails?.data;
    },
    gaugeCorrelationHasRange() {
      const details = this.correlationDetails;
      return details && details.beginLowRunnable && details.beginMediumRunnable && details.beginHighRunnable &&
        details.endHighRunnable;
    },
    yMax() {
      return Decimal.max(...this.readings.map(r => r.value)) * 1.25;
    },
    timeScaleBounds() {
      let start
      switch (this.timeScale) {
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
    }
  },
  methods: {
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
                    return( `${label} ${tooltipItem.value} ${otherthis.metric.unit}`);
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
              unit: this.timeScale,
              displayFormats: {
                day: 'h:mm A',
                week: 'MM/DD h:mm A',
                month: 'MM/DD',
                year: 'MM/DD/YYYY'
              },
              min: this.timeScaleBounds.timeStart
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.metric.name,
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
              suggestedMax: this.yMax,
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 14,
              callback: (value)=>`${value} ${otherthis.metric.unit}`
            },
            beforeBuildTicks: () => {
              chartOptions.scales.yAxes[0].ticks.min = 100
            }
          }]
        }
      }

      if (this.gaugeCorrelationHasRange && this.metric.key === this.correlationDetails.flowMetric) {
        let graphBackgrounds = [
          {
            min: Number.MIN_SAFE_INTEGER,
            max: this.correlationDetails.beginLowRunnable,
            class: 'below-recommended'
          },
          {
            min: this.correlationDetails.beginLowRunnable,
            max: this.correlationDetails.beginMediumRunnable,
            class: 'low-runnable'
          },
          {
            min: this.correlationDetails.beginMediumRunnable,
            max: this.correlationDetails.beginHighRunnable,
            class: 'runnable'
          },
          {
            min: this.correlationDetails.beginHighRunnable,
            max: this.correlationDetails.endHighRunnable,
            class: 'high-runnable'
          },
          {
            min: this.correlationDetails.endHighRunnable,
            max: Number.MAX_SAFE_INTEGER,
            class: 'above-recommended'
          }
        ]

        chartOptions.graphRange = graphBackgrounds.map(x => ({...x, color: classToColor(x.class) }));
      }

      buildChart(ctx, this.chartLabels, this.readings.map(r => r.value), chartOptions)

    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>
