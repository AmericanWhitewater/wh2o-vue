import { wpClient } from "@/app/http" 

export async function getReachProjects(id) {
  return wpClient
    .get('projects', {
      params: {
        reach: id
      }
    })
    .then(res => res.data)
}