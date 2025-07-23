import { wpClient } from "@/app/http"

export async function getReachArticles(id) {
  return wpClient
    .get('posts', {
      params: {
        reachid: id
      }
    })
    .then((res) => res.data);
}