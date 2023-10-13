import { wpClient } from "@/app/http"

export async function getReachArticles(id) {
  return wpClient
    .get('posts', {
      params: {
        reach: id
      }
    })
    .then((res) => res.data);
}