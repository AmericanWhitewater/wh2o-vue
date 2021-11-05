import http from "@/app/http"

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
                      id
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                      author
                      caption
                      description
                      photo_date
                      poi_name
                      poi_id
                      subject
                    }
                    permissions {
                      domain
                      permission
                      result
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
                    gauge {
                      id
                      name
                    }
                    metric {
                      name
                      unit
                    }
                  }
            }
          }
    `
    })
    .then(res => res.data.data.posts.data[0])
}
