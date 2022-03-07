import http from "@/app/http";

export async function canCreateReach({ plat, plon }) {
  /**
   * below the info requires an object literal, as variable interpolation is not part of the type "ArbitraryJSON"
   */
  return http
    .post("graphql", {
      query: `
      query{
        userPermission(domain: "ReachSecurity", permission: "create", info: {plon:${plon},plat:${plat} }) {
          result
        }
      }
      `,
      variables: {},
    })
    .then(
      (res) =>
        res.data.data.userPermission?.result &&
        !res.data.userPermission?.result?.match("/DENY/")
    );
}
