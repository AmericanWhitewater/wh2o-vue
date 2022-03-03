import http from "@/app/http"

export async function getReachGallery(data) {
  return http
    .post('/graphql', {
      query: `
                query {
                  posts(
                    first: ${data.per_page},
                    post_types: [JOURNAL,PHOTO_POST],
                    reach_id: "${data.reach_id}", 
                    page: ${data.page}, 
                    orderBy: {field: REVISION, order: DESC}
                    ) {
                      data {
                        id
                        reach_id
                        metric_id
                        post_date
                        post_type
                        permissions {
                          domain
                          permission
                          result
                        }
                        metric {
                          name
                          unit
                        }
                        gauge {
                          id
                          name
                        }
                        reading
                        photos {
                          image {
                            uri {
                              thumb
                              medium
                              big
                            }
                            file_size
                          }
                          id
                          author
                          caption
                          description
                          photo_date
                          poi_name
                          poi_id
                          subject
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
                  }`
    })
    .then(res => res.data)
}