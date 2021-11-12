import http from "@/app/http"

export async function getUser() {
  return http.post('graphql', {
      query: `
              query {
                  me {
                    uid
                    email
                    name
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
                  }
                }
              `,
    })
    .then((res) => {

      if (res.data.data.me && res.data.data.me.uid !== '0') {
        return res.data.data.me
      } else {
        return null
      }

    });
}