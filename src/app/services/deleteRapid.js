import http from "@/app/http"

export async function deleteRapid(id) {
  return http.post('graphql', {
    query: `
            mutation ($id:ID!) {
              poiDelete(id: $id) {
                id
              }
            }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}