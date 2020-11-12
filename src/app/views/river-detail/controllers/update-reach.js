import { httpClient } from '@/app/global/services'

const updateReach = data => {
  return httpClient
    .post('graphql/', {
      query: `
        mutation ($id:ID!, $reach: ReachInput!) {
          reachUpdate(id: $id, reach: $reach) {
            river,
            section,
            class,
            length,
            avggradient,
            maxgradient
          }
        }
      `,
      variables: {
        id: data.id,
        reach: {
          river: data.river,
          section: data.section,
          class: data.class,
          length: data.length,
          avggradient: data.avggradient,
          maxgradient: data.maxgradient
        }
      }
    }).then(response => {
      return response.data
    })
}

export { updateReach }
