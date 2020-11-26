import http from "@/app/http"

export async function getGage(id) {
  return http.post('graphql', {
    query:
      `query ($gauge_id: ID!) {
        gauge(id: $gauge_id) {
          id,    
          name,    
          source,    
          source_id,
          huc
          loc
          state
          timezone
          enabled
          updates {
            metric_id
            obs_reading
            updated
            lobs_reading
            metric {
              id
              name   
            }      
          }
        }
      }`,
    variables: {
      gauge_id: id
    }
  }).then(res => res.data.data.gauge)
}

export async function getGageMetrics(id) {
  return http.post('/graphql', {
    query: `
      {
        getGaugeInformationForReachID(id: ${id}) {
            metrics {
              name
              unit
              format
              id
              shortkey
            }
          }
        }
    
    `
  })
    .then(res => res.data.data.getGaugeInformationForReachID.metrics)
}

export async function getGageReadings({ gauge_id, metric_id, timeStart, timeEnd, resolution}) {
  const url = `api/gauge/${gauge_id}/flows/${metric_id}?from=${timeStart}&to=${timeEnd}&resolution=${resolution}`

  return http.get(url).then(res => res.data)
}