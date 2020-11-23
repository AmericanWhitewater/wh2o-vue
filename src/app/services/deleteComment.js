import http from "@/app/http"

export async function deleteComment(id) {
  return http.post('/graphql', {
    query: `
            mutation ($post_id:ID!){postDelete(id:$post_id){id}}
          `,
    variables: {
      post_id: id
    }
  }).then(res => res.data)
}