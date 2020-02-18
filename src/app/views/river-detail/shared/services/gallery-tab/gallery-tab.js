import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchGalleryData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
                photos(first:20) {
                  data {
                      caption,
                      description,
                      file {
                        ext,
                          uri {
                              thumb,
                              big
                          }
                      },
                      post {
                        reading,
                        metric,
                        detail
                    }
                  }
            }
        }
    }
    
    `
    })
    .then(res => res.data)
}

export { fetchGalleryData }
