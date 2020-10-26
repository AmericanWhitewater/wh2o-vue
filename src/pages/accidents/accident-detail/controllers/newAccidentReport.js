import { rest } from '@/services'

export async function newAccidentReport(data) {
  return rest.post('/new-accident', JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.data)
}