import http from "@/app/http"

export async function getReachCredits(id) {
  return http
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
                        revision_comment
                        edited
                        }
                    }
                }
            }`
    })
    .then(res => res.data)
}