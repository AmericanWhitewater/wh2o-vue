import http from "@/app/http"

export async function getRiverNews(id) {
  return http
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