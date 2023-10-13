import { laravelClient } from "@/app/http"

export async function getRapids(id) {
  return laravelClient
    .post('graphql', {
      query: `
                  query {
                    reach(id: ${id}) {
                      pois {
                        approximate
                        character
                        description
                        difficulty
                        distance
                        id
                        name
                        rloc
                        photo {
                          poi_name
                          subject
                          description
                          author
                          caption
                          photo_date
                          image {
                            uri {
                              thumb
                              medium
                              big
                            }
                          }
                          id
                        }
                      }
                    }
                  }
                `
    })
    .then(res => res.data)
}