import {rest} from "./rest"

export async function riverSearch(term) {
  return await rest.get(`/reaches?river=${term}`).then(res => res.data)
}