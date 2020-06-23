import { httpClient } from '@/app/global/services'

const fetchAccessData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        
          reach(id: "${data}") {
            direction_default
            custom_destination
            county
            permitid
            permitinfo
            permiturl
            shuttledetails
            zipcode
            geom
          }

    }
    
    `
    })
    .then(res => res.data)
}

export { fetchAccessData }
