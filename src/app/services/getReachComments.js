import http from "@/app/http"

export async function getReachComments(id) {

  return http
    .post('graphql', {
      query: `
        query Related{
            posts(reach_id: "${id}", post_types: COMMENT, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
              data {
                id
                title
                detail
                post_date
                revision
                post_type
                permissions {
                  domain
                  permission
                  result
                }
                user {
                  name
                  uid
                  image {
                    uri {
                      thumb
                      medium
                      big
                    }
                  }
                }
              }
            }
          }

    `
    })
    .then(res => res.data)
}