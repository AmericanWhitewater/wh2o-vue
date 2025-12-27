import { wpClient } from "@/app/http"

export async function getReachAccidents(wpID) {

  return wpClient.get('accident', {
    params: {
      reachid: wpID
    }
  }).then(res => res.data);
}