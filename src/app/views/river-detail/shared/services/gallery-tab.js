import { httpClient } from '@/app/global/services'

const fetchGalleryData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        posts(
          first: ${data.per_page},
          post_types: [JOURNAL,PHOTO_POST],
          reach_id: "${data.reach_id}", 
          page: ${data.page}, 
          orderBy: {field: REVISION, order: ASC}
          ) {
             data {
              id
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

export { fetchGalleryData }
