const flowChartBackground = {
  beforeDraw: (chart) => {
    const graphRange = chart.config.options.graphRange;
    const chartArea = chart.chartArea;
    const ctx = chart.chart.ctx;
    //    const minRangeStart = graphRange.min;
    const yAxis = chart.scales["y-axis-0"];
    const yTicks = yAxis.ticksAsNumbers;

    ctx.save();

    if (yTicks.length > 2) {
      graphRange.forEach((x) => {
        //const chartHeight = chartArea.bottom - chartArea.top;
        //const minRangeY = yAxis.getPixelForValue(x.min);
        const top = yAxis.getPixelForValue(x.max);
        let drawTop = top > chartArea.top ? top : chartArea.top;
        if (top > chartArea.bottom) {
          drawTop = chartArea.bottom;
        }
        const bottom = yAxis.getPixelForValue(x.min);
        let drawBottom = bottom > chartArea.bottom ? chartArea.bottom : bottom;
        if (bottom < chartArea.top) {
          drawBottom = chartArea.top;
        }

        const rangeWidth = chartArea.right - chartArea.left;

        // set the high range color
        ctx.fillStyle = x.color;
        // we don't draw the max range if it's off the chart

        ctx.fillRect(chartArea.left, drawTop, rangeWidth, drawBottom - drawTop);
      });
    }
    ctx.restore();
  },
};

export { flowChartBackground };
