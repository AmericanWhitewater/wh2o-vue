import { laravelClient } from "@/app/http"

export async function getReachGalleryIndex(id) {
  return laravelClient
    .post('/graphql', {
      query: `
        query {
          reach(id: ${id}) {
            photos(
              first: 2500,
              orderBy: [{field: REVISION, order: DESC}],
              page: 1
            ) {
              data {
                id
              }
            }
          }
        }`
      }).then(res => res.data)
}