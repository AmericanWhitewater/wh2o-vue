import http from "@/app/http";

/**
 * Updates a reach, you may pass a partial reach.
 * I considered cleaning up empty geometries here like I did in reachCreate but
 * it seems that usage of the endpoint is aligned with the idea that untouched fields
 * are not passed. If this changes we could consider the same treatment.
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export async function updateReach(data) {
  return http
    .post("graphql", {
      query: `
              mutation ($id:ID!, $reach: ReachInput!) {
                reachUpdate(id: $id, reach: $reach) {
                  river,
                  section,
                  class,
                  length,
                  avggradient,
                  maxgradient,
                  status
                }
              }
            `,
    variables: data
  }).then(res => res.data)
}