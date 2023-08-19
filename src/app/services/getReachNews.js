import { laravelClient } from "@/app/http"

export async function getReachNews(id) {
  return laravelClient
    .post('graphql', {
      query: `
              query {
                  getRiverArticles(id: ${id}) {
                      articles {
                      abstract
                      image {
                        uri {
                          thumb
                          medium
                          big
                        }
                      }
                      author
                      posted_date
                      title
                      contents
                      id
                      }
                  }
              }`
    })
    .then(res => res.data)
}