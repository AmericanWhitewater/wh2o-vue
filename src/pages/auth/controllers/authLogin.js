import { rest } from '@/services'
import qs from 'qs'

export async function authLogin(input) {
  
  return await rest.post('/user-login', qs.stringify({
    email: input.email,
    password: input.password
  }, { indices: false })
  ).then((res) => res.data)
}