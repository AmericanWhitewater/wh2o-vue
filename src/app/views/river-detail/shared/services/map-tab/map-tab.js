import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchMapData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reachmap(box:${data}) {
          
        }
    }
    
    `
    })
    .then(res => res.data)
}

export { fetchMapData }
