import { wpClient } from "@/app/http"

export async function getReachAccidents(wpID) {

  return wpClient.get('accidents', {
    params: {
      reachid: wpID
    }
  }).then(res => res.data);
}