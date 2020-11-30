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