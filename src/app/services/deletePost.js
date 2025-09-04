import { laravelClient } from "@/app/http"

export async function deletePost(id) {
  return laravelClient.post('/graphql', {
    query: `
          mutation ($id:ID!) {
            postDelete(id: $id)  {
            id
          }
        }`,
    variables: {
      id
    }
  }).then(res => res.data)
}