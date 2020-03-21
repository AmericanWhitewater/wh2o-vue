import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const getAccidentDetail = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query  {
        accidents(id: ${data}, first: 10, page: 1) {
          data {
            age
            accidentdate
            boattype
            cause
            causes {
              cause
            }
            contactemail
            contactname
            contactphone
            countryabbr
            description
            difficulty
            experience
            factors {
              factor
            }
            groupinfo
            id
            injuries {
              injury
            }
            location
            numvictims
            othervictimnames
            privcomm
            reach_id
            rellevel
            river
            section
            status
            state
            type
            victimname
            waterlevel
          }
        }
      }
      
    
    `
    })
    .then(res => res.data)
}
export { getAccidentDetail }
