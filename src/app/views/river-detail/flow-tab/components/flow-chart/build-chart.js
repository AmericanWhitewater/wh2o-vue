import Chart from 'chart.js'

export function buildChart (context, labels, readings, options) {
  new Chart(context, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: readings,
        borderWidth: 1
      }]
    },
    options
  })
}
