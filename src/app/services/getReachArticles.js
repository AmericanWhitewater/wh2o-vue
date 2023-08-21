import { wpClient } from "@/app/http"

// TODO: add id param back in
/* eslint-disable no-unused-vars */
export async function getReachArticles(id) {
  return wpClient
    .get('posts')
    .then((res) => res.data);
}