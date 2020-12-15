import http from "@/app/http"

export async function getGage(id) {
  return http.post('graphql', {
    query: `
      query ($gauge_id: ID!) {
        gauge(id: $gauge_id) {
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
              metric {
                id
                name
              } 
            }
          }
        }
          `,
    variables: {
      gauge_id: id
    }
  }).then(res => res.data.data )
}