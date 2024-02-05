import http from "@/app/http"

export async function getReachCorrelationGauge(id) {
  return http.post('graphql', {
    query: `
      query ($source_id: AWID!, $source: String!) {
        gauge(source: $source, source_id: $source_id) {
          id
          name
          source
          source_id
        }
      }
      `,
    variables: {
      source_id: id,
      source: "river"
    }
  }).then(res => res.data.data);
}
