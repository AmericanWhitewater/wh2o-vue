import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchCreditsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
          revisions(first:20, page:1){
            data {
              id,
                rellevel,
                status,
                factors{
                    factor
                }
            }
        }
      }
    }
    
    `
    })
    .then(res => res.data)
}

export { fetchCreditsData }
