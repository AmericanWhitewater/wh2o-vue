import http from "@/app/http"

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