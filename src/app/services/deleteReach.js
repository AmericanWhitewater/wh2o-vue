import http from "@/app/http"

export async function deleteReach(id) {
  return http.post('graphql', {
    query: `
            mutation ($id:ID!) {
              reachDelete(id: $id) {
                id
              }
            }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}