import http from "@/app/http"

export async function getReachGallery(id, pagination) {
  return http
    .post('/graphql', {
      query: `
        query {
          reach(id: ${id}) {
            photos(
              first: ${pagination.perPage},
              page: ${pagination.page}, 
              orderBy: {field: DATE, order: DESC}
            ) {
              data {
                id
                author
                caption
                description
                photo_date
                poi_name
                poi_id
                subject

                post {
                  metric_id
                  post_date
                  post_type
                  reading
                  metric {
                    name
                    unit
                  }
                  gauge {
                    id
                    name
                  }
                }
                permissions {
                  domain
                  permission
                  result
                }
                image {
                  uri {
                    thumb
                    medium
                    big
                  }
                  file_size
                }
              }
              paginatorInfo {
                count
                perPage
                currentPage
                lastPage
                total
              }
            }  
          }
        }`
    })
    .then(res => res.data)
}