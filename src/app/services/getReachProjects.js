import { wpClient } from "@/app/http" 

export async function getReachProjects(wpID) {
  return wpClient
    .get('project', {
      params: {
        reachid: wpID
      }
    })
    .then(res => res.data)
}