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
      return details && details.beginLowRunnable && details.endHighRunnable;
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

      if (this.gaugeCorrelationHasRange && this.metric.key === this.correlationDetails.metric) {
        let graphBackgrounds = [
          {
            min: Number.MIN_SAFE_INTEGER,
            max: this.correlationDetails.beginLowRunnable,
            class: 'below-recommended'
          }
        ];
        // per our migration plan some reaches will only have beginLowRunnable and endHighRunnable defined, not all five
        // handle this situation by establishing a "runnable" state rather than low/med/high
        if (!this.correlationDetails.beginMediumRunnable && !this.correlationDetails.beginHighRunnable) {
          graphBackgrounds.push({
            min: this.correlationDetails.beginLowRunnable,
            max: this.correlationDetails.endHighRunnable,
            class: 'medium-runnable'
          });
        } else {
          graphBackgrounds.push({
              min: this.correlationDetails.beginLowRunnable,
              max: this.correlationDetails.beginMediumRunnable,
              class: 'low-runnable'
            },
            {
              min: this.correlationDetails.beginMediumRunnable,
              max: this.correlationDetails.beginHighRunnable,
              class: 'medium-runnable'
            },
            {
              min: this.correlationDetails.beginHighRunnable,
              max: this.correlationDetails.endHighRunnable,
              class: 'high-runnable'
            }
          );
        }
        graphBackgrounds.push({
            min: this.correlationDetails.endHighRunnable,
            max: Number.MAX_SAFE_INTEGER,
            class: 'above-recommended'
          }
        );

        chartOptions.graphRange = graphBackgrounds.map(x => ({...x, color: this.classToColor(x.class) }));
      }

      buildChart(ctx, this.chartLabels, this.readings.map(r => r.value), chartOptions)

    },
    // this duplicates logic that is elsewhere defined by scss in
    // $flow-map in _variables.scss
    classToColor(cssClass) {
      switch (cssClass) {
        case "below-recommended":
          return "#FF8785";
        case "low-runnable":
          return "#9cf1bb";
        case "medium-runnable":
          return "#59E78D";
        case "high-runnable":
          return "#1fd561";
        case "above-recommended":
          return "#68DFE9";
      }
      return "";
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>
