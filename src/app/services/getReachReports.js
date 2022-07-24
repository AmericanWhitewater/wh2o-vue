import http from "@/app/http"

export async function getReachReports(id, pagination) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              reach_id: "${id}",
              first: ${pagination.perPage},
              page: ${pagination.page},
              post_types:[JOURNAL],
              orderBy: {field: POST_DATE, order: DESC}
              ) {
                 data {
                    detail
                    id
                    title
                    reading
                    post_date
                    reach_id
                    observation
                    photos {
                      url
                      id
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                    }
                    permissions {
                      domain
                      permission
                      result
                    }
                    user {
                      uid
                      name
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                    }
                  }

                  paginatorInfo {
                    count
                    perPage
                    currentPage
                    lastPage
                    total
                  }
            }
          }
    `
    })
    .then(res => res.data)
}