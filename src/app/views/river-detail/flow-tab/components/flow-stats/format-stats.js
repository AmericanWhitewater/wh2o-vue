export function formatStats (readings) {
  const data = readings.map(reading => Math.floor(reading.reading))
  let readingsSum = 0

  data.forEach(reading => {
    readingsSum = readingsSum + reading
  })

  return {
    min: readings.length ? Math.min(...data) : null,
    max: readings.length ? Math.max(...data) : null,
    avg: readings.length ? Math.floor(readingsSum / readings?.length) : null
  }
}
