import { laravelClient } from "@/app/http"

export async function getAccidents() {
  return laravelClient.post('graphql', {
    query: `
      query { 
        accidents(first: 25, orderBy: {field: ACCIDENT_DATE, order: ASC}, page: 1) {
            data {
              id
              location
              state
            }
            paginatorInfo {
              count
              currentPage
              total
              perPage
            }
      }
      }
  `,
  }).then(res => res.data)
}