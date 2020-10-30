import { rest } from '@/services'

export async function deleteComment(id) {
  return rest.delete(`delete-comment?id=${id}`).then(res => res.data);
}