import http from "@/app/http"

export async function getReachReports(id) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              reach_id: "${id}",
              first: 100,
              page: 1,
              post_types:[JOURNAL],
              orderBy: {field: REVISION, order: DESC}
              ) {
                 data {
                    detail
                    id
                    title
                    reading
                    post_date
                    reach_id
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
                    user {
                      uid
                      uname
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                    }
                  }
            }
          }
    `
    })
    .then(res => res.data.data.posts.data)
}