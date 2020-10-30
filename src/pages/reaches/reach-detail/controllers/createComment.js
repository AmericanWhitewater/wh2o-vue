import { rest } from '@/services'

export async function createComment(data) {
  return rest.post('new-comment', data).then(res => res.data);
}