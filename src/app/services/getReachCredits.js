import { laravelClient } from "@/app/http"

export async function getReachCredits(id) {
  return laravelClient
    .post('/graphql', {
      query: `
          query {
            reach( id: ${id}) {
              revisions(first:100,page:0){
                data {
                  id
                  revision
                  sk {
                      name
                  }
                  permissions {
                    domain
                    permission
                    result
                  }
                  revision_comment
                  edited
                }
              }
            }
          }`
    })
    .then(res => res.data)
}