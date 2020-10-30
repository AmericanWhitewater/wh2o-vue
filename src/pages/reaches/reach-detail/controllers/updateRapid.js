import { rest } from '@/services'

export async function updateRapid(id, data) {
  return rest.put(`update-rapid?id=${id}`, data).then(res => res.data);
}