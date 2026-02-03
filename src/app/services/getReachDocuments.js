import { wpClient } from "@/app/http"

export async function getReachDocuments(wpID) {
  return wpClient.get('document', {
    params: {
      reachid: wpID
    }
  }).then(res => res.data);
}
