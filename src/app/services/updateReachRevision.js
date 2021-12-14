import http from "@/app/http"

export async function updateReachRevision(data) {
  return http.post('graphql', {
    query: `
              mutation ($id:ID!, $revision: Int!, $comment: String) {
                reachRevisionUpdate(id: $id, revision: $revision, comment: $comment) {
                  id
                  revision_comment
                  revision
                }
              }
            `,
    variables: data
  }).then(res => res.data)
}