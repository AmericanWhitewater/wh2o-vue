import { wpClient } from "@/app/http"

export async function getReachArticles(wpID) {
  return wpClient
    .get('article', {
      params: {
        reachid: wpID
      }
    })
    .then((res) => res.data);
}