import Chart from 'chart.js'
import { flowChartBackground } from './flow-chart-background'

export function buildChart (context, labels, readings, options) {
  return new Chart(context, {
    plugins: 'graphRange' in options ? [flowChartBackground] : [],
    responsive: true,
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: readings,
        borderWidth: 2,
        label: 'Gage Reading',
        fill: false,
        borderColor: 'rgba(60, 86, 110, 1)'
      }]
    },
    options
  })
}
