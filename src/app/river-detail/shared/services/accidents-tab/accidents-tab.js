import { httpClient } from '../../../../global/services'

import { apiConstants } from '../../config'

const fetchAccidentsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
          accidents(first:100, page:1){
            data {
              id,
                rellevel,
                injuries{
                  injury
                  },
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

export { fetchAccidentsData }
