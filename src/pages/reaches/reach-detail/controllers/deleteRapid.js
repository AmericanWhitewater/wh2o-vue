import { rest } from '@/services'

export async function deleteRapid(id) {
  return rest.post('delete-rapid', id).then(res => res.data);
}