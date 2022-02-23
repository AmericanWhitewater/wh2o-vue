import http from "@/app/http";

export async function getReachReports(id) {
  return http
    .post("graphql", {
      query: `
        query {
            posts(
              reach_id: "${id}",
              first: 100,
              page: 1,
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
            }
          }
    `,
    })
    .then((res) => res.data.data.posts.data);
}
