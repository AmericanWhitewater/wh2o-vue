import http from "@/app/http"

export async function getTripReports() {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              first: 20,
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
                    }
                  }
            }
          }
    `
    })
    .then(res => res.data.data.posts.data)  
}


export async function getReport(id) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              first: 1,
              id: "${id}"
              ) {
                 data {
                    detail
                    id
                    title
                    reading
                    post_type
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
                    permissions {
                      domain
                      permission
                      result
                    }
                    user {
                      uid
                      uname
                    }
                    gauge {
                      id
                      name
                    }
                  }
            }
          }
    `
    })
    .then(res => res.data.data.posts.data[0])
}