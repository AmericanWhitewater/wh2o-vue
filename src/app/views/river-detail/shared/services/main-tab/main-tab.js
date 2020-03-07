import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchRiverDetailData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      {
        reach(id: ${data}) {
          agency
          altname
          avggradient
          class
          county
          custom_destination
          description
          direction_default
          edited
          edited
          gaugeinfo
          geom
          huc
          image_override
          length
          maxgradient
          permitid
          permitinfo
          permiturl
          pois
          {name,id}
          photo {
            id
          }
          plat
          ploc
          plon
          readingsummary {
            adjusted_reach_class
            gauge_estimated
            gauge_id
            gauge_important
            gauge_max
            gauge_min
            gauge_perfect
            obs_id
            range_comment
          }
          revision
          revision_comment
          river
          section
          shuttledetails
          skid
          status
          thumboverride
          tlat
          tloc
          tlon
          trrn
          was_final
          zipcode
        }
      }
    
    `
    })
    .then(res => res.data)
}

export { fetchRiverDetailData }
