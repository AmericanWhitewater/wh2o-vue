import http from "@/app/http"

export async function updateReachGeom(data) {
  return http
    .post('graphql', {
      query: `
                mutation ($id:ID!, $reach: ReachInput!) {
                  reachUpdate(id: $id, reach: $reach) {
                    geom,
                    ploc,
                    tloc,
                    length
                  }
                }
              `,
      variables: {
        id: data.id,
        reach: {
          geom: data.geom,
          ploc: data.ploc,
          tloc: data.tloc,
          length: data.length,
          river: data.river,
          section: data.section,
          class: data.class
        },
      },
    })
    .then(res => res.data);
}