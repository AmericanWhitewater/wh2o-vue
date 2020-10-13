import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchRiverDetailData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      {
        reach(id: ${data}) {
          avggradient
          id
          class
          description
          edited
          edited
          length
          maxgradient
          plat
          plon
          geom
          photo {
            id
            post {
              user {
                uname
                uid
              }
            }
            image {
              uri {
                medium
                big
              }
            }
          }
          river
          section
        }
      }
    
    `
    })
    .then(res => res.data)
}

const updateRiverDetailGeom = data => {
  return httpClient
    .post(apiConstants.graphql, {
      query: `
        mutation ($id:ID!, $reach: ReachInput!) {
          reachUpdate(id: $id, reach: $reach) {
            geom,
            ploc,
            tloc
          }
        }
      `,
      variables: {
        id: data.id,
        reach: {
          geom: data.geom,
          ploc: data.ploc,
          tloc: data.tloc
        }
      }
    }).then(response => {
      return response.data
    })
}

const fetchReleases = data => {
  return httpClient
    .post(apiConstants.graphql, {

    }).then(r => {
      return r.data
    })
}

const updateBetaBox = data => {
  const url = `/rapid/${data.id}`
  return httpClient.patch(url, data)
}

export { fetchRiverDetailData, updateBetaBox, updateRiverDetailGeom, fetchReleases }
