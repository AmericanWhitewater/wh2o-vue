import { httpClient } from "@/app/global/services";

const fetchRiverDetailData = (data) => {
  return httpClient
    .post('graphql', {
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
    
    `,
    })
    .then((res) => res.data.data.reach);
};

const updateRiverDetailGeom = (data) => {
  return httpClient
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
        },
      },
    })
    .then((response) => {
      return response.data;
    });
};

const fetchReleases = () => {
  return httpClient.post('graphql', {}).then((r) => {
    return r.data;
  });
};

const updateBetaBox = (data) => {
  const url = `/rapid/${data.id}`;
  return httpClient.patch(url, data);
};

export {
  fetchRiverDetailData,
  updateBetaBox,
  updateRiverDetailGeom,
  fetchReleases,
};
