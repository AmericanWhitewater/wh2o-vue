import { wpClient } from "@/app/http"

export async function getReachDocuments(id) {
  return wpClient.get('documents', {
    params: {
      reachid: id
    }
  }).then(res => res.data);
}
