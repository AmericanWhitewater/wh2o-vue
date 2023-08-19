import { laravelClient } from "@/app/http"

export async function deletePhoto(id) {
  return laravelClient.post('/graphql', {
    query: `
          mutation ($id:ID!) {
            photoDelete(id: $id)  {
            id
          }
        }`,
    variables: {
      id
    }
  }).then(res => res.data)
}