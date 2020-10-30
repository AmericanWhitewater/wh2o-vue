import { rest } from '@/services'

export async function createRapid(data) {
  return rest.post('new-rapid', data).then(res => res.data);
}