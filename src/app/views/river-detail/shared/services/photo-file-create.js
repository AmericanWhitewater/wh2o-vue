import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchNewsTabData = () => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
        mutation {

          photoFileCreate(
            fileinput: {
              file: "", 
              section: REACH, 
              section_id: "2345"
            }, 
            photo: {
              caption: "caption", 
              author: "author", 
              description: ""
            }
            
      
            ) {
            id
          }
        }

    
    `
    })
    .then(res => res.data)
}

export { fetchNewsTabData }
