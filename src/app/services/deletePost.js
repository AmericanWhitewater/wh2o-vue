import http from "@/app/http"

export async function deletePost(id) {
  return http.post('/graphql', {
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