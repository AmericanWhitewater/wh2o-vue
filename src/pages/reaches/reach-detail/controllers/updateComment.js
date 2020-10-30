import { rest } from '@/services'

export async function updateComment(id, data) {
  return rest.put(`update-comment?id=${id}`, data).then(res => res.data);
}