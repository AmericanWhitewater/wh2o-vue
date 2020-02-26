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
                      url,
                      post {
                        reading,
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
