import { rest } from "@/services"

export async function updateReach(reachId, data) {
  return rest.put(`/update-reach?id=${reachId}`, data).then(res => res.data)
}