import { httpClient } from '../../../../global/services'

import { apiConstants } from '../../config'

const getAccidentDetail = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
          accidents(first:100, page:1){
            data {
                causes{
                  cause
                },
                injuries{
                  injury
                  },
                factors{
                    factor
                },
                # contact,
                # email,
                age,
                boattype,
                cause,
                contactname,
                contactphone,
                countryabbr,
                description,
                difficulty,
                experience,
                groupinfo,
                id,
                location,
                numvictims,
                othervictimnames,
                privcomm,
                reach_id,
                rellevel,
                river,
                section,
                state,
                status,
                type,
                victimname,
                waterlevel,
            }
        }
      }
    }
    
    `
    })
    .then(res => res.data)
}
export { getAccidentDetail }
