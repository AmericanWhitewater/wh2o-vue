import http from "@/app/http"

export async function getReach(id) {
  return http
    .post('graphql', {
      query: `
              {
                reach(id: ${id}) {
                  avggradient
                  id
                  class
                  description
                  edited
                  edited
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  photo {
                    id
                    post {
                      user {
                        uname
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                }
              }
            
            `,
    })
    .then((res) => res.data);
}