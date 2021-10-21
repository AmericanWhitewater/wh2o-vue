import http from "@/app/http"

export async function getReachReports(id) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              first: 20,
              reach_id: "${id}",
              post_types:[JOURNAL,GAUGE_OBSERVATION],
              page: 1,
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