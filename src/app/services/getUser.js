import http from "@/app/http"

export async function getUser() {
  return http.post('graphql', {
      query: `
              query {
                  me {
                    uid
                    email
                    mobile_profile
                    gauge_notification {
                      gauge_id
                    }
                    permissions
                    image {
                      uri {
                        big
                        medium
                        thumb
                      }
                    }
                    uname
                  }
                }
              `,
    })
    .then((res) => res.data.data.me);
}