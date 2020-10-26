import { rest } from '@/services'

export async function getUser(uid) {
  return rest.get(`/user?uid=${uid}`).then((res) => res.data)
}