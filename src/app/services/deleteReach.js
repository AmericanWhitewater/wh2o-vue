import { laravelClient } from "@/app/http"

export async function deleteReach(id) {
  return laravelClient.post('graphql', {
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