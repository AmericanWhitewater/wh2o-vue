const flowChartBackground = {
  highRangeHeight: function (chartArea) {

  },
  runningRangeHeight: function (chartArea) {

  },
  lowRangeHeight: function (chartArea) {

  },

  beforeInit: function (chart, options) {

  },

  beforeDraw: (chart, easing) => {
    const graphRange = chart.config.options.graphRange
    const chartArea = chart.chartArea
    const ctx = chart.chart.ctx
    // running-> minRangeStart < running < maxRangeStart
    const minRangeStart = graphRange.min
    const highRangeStart = graphRange.max
    const yAxis = chart.scales['y-axis-0']
    const yTicks = yAxis.ticksAsNumbers

    ctx.save()

    if (yTicks.length > 2) {
      const chartHeight = chartArea.bottom - chartArea.top
      // const chartMax = yAxis.getPixelForTick(0) // the 0 index is always the highest value in the chart

      const minRangeY = yAxis.getPixelForValue(minRangeStart)
      const highRangeY = yAxis.getPixelForValue(highRangeStart)

      const rangeWidth = chartArea.right - chartArea.left
      // high range

      const tickMaxPixel = yAxis.getPixelForValue(yAxis.max)
      // const tickMinPixel = yAxis.getPixelForValue(yAxis.min)

      const rangeHighHeight = -(highRangeY - chartArea.top)
      const rangeLowHeight = chartArea.bottom - minRangeY
      // const rangeRunningHeight = chartHeight - (rangeLowHeight + Math.abs(rangeHighHeight)) // because high range height is drawn up not down

      // console.log(rangeHighHeight);

      // console.log(high);
      // set the high range color
      ctx.fillStyle = graphRange.colors.high
      // draw the high range
      if (highRangeStart < yAxis.max) { // we don't draw the max range if it's off the chart
        ctx.fillRect(chartArea.left, highRangeY, rangeWidth, rangeHighHeight)
      }
      // set the running color
      ctx.fillStyle = graphRange.colors.running
      if (highRangeStart > yAxis.max) { // we draw running to max if the high range if off the chart
        const runningHeight = chartHeight - rangeLowHeight
        ctx.fillRect(chartArea.left, tickMaxPixel, rangeWidth, runningHeight)
      } else {
        const runningHeight = chartHeight - (Math.abs(rangeLowHeight) + Math.abs(rangeHighHeight))
        ctx.fillRect(chartArea.left, highRangeY, rangeWidth, runningHeight)
      }

      // draw the low range
      // low is the hardest one to draw
      if (minRangeY > -999) {
        ctx.fillStyle = graphRange.colors.low
        // const h = chartHeight - (rangeHighHeight + rangeRunningHeight)
        // ctx.fillRect(chartArea.left, high + rangeRunningHeight, rangeWidth, h);
        ctx.fillRect(chartArea.left, minRangeY, rangeWidth, rangeLowHeight)
      }
    }

    ctx.restore()
  }

}

export { flowChartBackground }
