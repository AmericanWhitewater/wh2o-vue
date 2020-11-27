import http from "@/app/http"

export async function getGage(id) {
  return http.post('graphql', {
    query: `
      query {
        gauge(id: ID!) {
            enabled
            huc
            id
            loc
            name
            source
            source_id
            state
            timezone
            updates {
              metric_id
              obs_reading
              updated
              lobs_reading
            }
          }
        }
      }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
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

export async function getGageReadings(data) {
  const url = `api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`

  return http.get(url).then(res => res.data)
}