export const GageChartConfig = {
  data: () => ({
    chartHeight: 200,
    chartConfig: {
      legend: {
        display: false
      },
      elements: {
        line: {
          tension: 0, // disables bezier curves
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
      hover: {
        animationDuration: 300 // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
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
        xAxes: [
          {
            type: 'time',
            display: true,
            distribution: 'series',
            time: {
              unit: 'h:mm a',
              displayFormats: {
                day: 'h:mm a',
                week: 'll',
                month: 'll',
                year: 'MMM YYYY'
              }
            },
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
              // labelOffset: 20,
              fontFamily: "'IBM Plex Sans' , 'sans-serif'",
              fontSize: 13,
              min: 7
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Reading',
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
              // fontSize: this.yTickFontSize
            }
            // beforeBuildTicks: axis => {
            //   opts.scales.yAxes[0].ticks["min"] = 100;
            // },
            // afterBuildTicks: function(axis) {
            //   // if (axis.ticks.length > 2) {
            //   //     axis.ticks.unshift(axis.ticks[0] * 1.3);
            //   //    // console.log(axis.ticks);
            //   // }
            // }
          }
        ]
      }
    }
  })
  // computed: {
  //   setYMax () {
  //     let yMax = this.$store.state.riverDetailState.gageReadingsData.data[0];
  //     console.log(yMax)
  //     yMax = Math.ceil(yMax * 1.3);
  //     this.chartConfig.scales.yAxes.ticks.suggestedMax = yMax
  //     return yMax
  //   }
  // }
}
