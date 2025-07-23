import { wpClient } from "@/app/http"

export async function getReachAccidents(id) {

  return wpClient.get('accidents', {
    params: {
      reachid: id
    }
  }).then(res => res.data);
}