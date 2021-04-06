import http from "@/app/http";
import { cloneDeep } from "lodash";

/**
 * Removes the geometry columns if they are blank.
 * @param reach
 * @return {*}
 */
export function removeOptionalGeometry(reach) {
  if (reach) {
    const rv = cloneDeep(reach);
    // if you aren't updating it, don't send it.
    // the following checks for geometries that are not being set.
    if (rv.length !== 0 && !rv.length) {
      delete rv.length;
    }

    if (!rv.ploc) {
      delete rv.ploc;
    }

    if (!rv.geom) {
      delete rv.geom;
    }

    if (!rv.tloc) {
      delete rv.tloc;
    }
    return rv;
  }
  return reach;
}

/**
 * Create reach, technically untouched/default fields should not be passed in to this method
 * but it seems in some cases empty geometries and blank-string lengths are passed to it, so
 * we do a bit of cleanup on those.
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export async function createReach(data) {
  const copyOfData = cloneDeep(data);
  copyOfData.reach = removeOptionalGeometry(data.reach);

  return http
    .post("graphql", {
      query: `
        mutation ($reach: ReachInput!) {
          reachUpdate(reach: $reach) {
            agency
            altname
            class
            county
            description
            gaugeinfo
            geom
            id
            length
            permitinfo
            permiturl
            ploc
            river
            section
            tloc
            zipcode
            status
          }
        }
            `,
      variables: copyOfData,
    })
    .then((res) => res.data);
}
