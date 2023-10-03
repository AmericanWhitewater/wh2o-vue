import { wpClient } from "@/app/http"

export async function getReachDocuments(id) {
  return wpClient.get('resources', {
    params: {
      reach: id
    }
  }).then(res => res.data);
}
