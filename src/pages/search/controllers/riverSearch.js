import { rest } from "@/services"

export async function riverSearch(term) {
  return rest.get(`/reaches?river=${term}`).then(res => res.data)
}