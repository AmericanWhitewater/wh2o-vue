const flowChartBackground = {

  beforeDraw: (chart) => {
    const graphRange = chart.config.options.graphRange
    const chartArea = chart.chartArea
    const ctx = chart.chart.ctx
    const minRangeStart = graphRange.min
    const highRangeStart = graphRange.max
    const yAxis = chart.scales['y-axis-0']
    const yTicks = yAxis.ticksAsNumbers

    ctx.save()

    if (yTicks.length > 2) {
      const chartHeight = chartArea.bottom - chartArea.top
      const minRangeY = yAxis.getPixelForValue(minRangeStart)
      const highRangeY = yAxis.getPixelForValue(highRangeStart)
      const rangeWidth = chartArea.right - chartArea.left

      // high range
      const tickMaxPixel = yAxis.getPixelForValue(yAxis.max)
      const rangeHighHeight = -(highRangeY - chartArea.top)
      const rangeLowHeight = chartArea.bottom - minRangeY

      // set the high range color
      ctx.fillStyle = graphRange.colors.high

      // draw the high range
      if (highRangeStart < yAxis.max) {
        // we don't draw the max range if it's off the chart
        ctx.fillRect(chartArea.left, highRangeY, rangeWidth, rangeHighHeight)
      }

      // set the running color
      ctx.fillStyle = graphRange.colors.running

      if (highRangeStart > yAxis.max) {
        // we draw running to max if the high range if off the chart
        const runningHeight = chartHeight - rangeLowHeight

        ctx.fillRect(chartArea.left, tickMaxPixel, rangeWidth, runningHeight)
      } else {
        const runningHeight = chartHeight - (Math.abs(rangeLowHeight) + Math.abs(rangeHighHeight))
        ctx.fillRect(chartArea.left, highRangeY, rangeWidth, runningHeight)
      }

      // draw the low range
      if (minRangeY > -999) {
        ctx.fillStyle = graphRange.colors.low
        ctx.fillRect(chartArea.left, minRangeY, rangeWidth, rangeLowHeight)
      }
    }

    ctx.restore()
  }

}

export { flowChartBackground }
