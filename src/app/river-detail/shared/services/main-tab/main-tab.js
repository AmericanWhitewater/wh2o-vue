import { httpClient } from '../../../../global/services'

import { apiConstants } from '../../config'

const fetchRiverDetailData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
             river,
             section,
             length,
             avggradient,
             maxgradient,
             description,
             edited,
             class,
             plat,
             plon,
             photo{
               file{
                 uri{
                   big
                 }
               }
             }
        }
    }
    
    `
    })
    .then(res => res.data)
}

export { fetchRiverDetailData }
