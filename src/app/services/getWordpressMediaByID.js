import { wpClient } from "@/app/http";

export async function getWordpressMediaByID(mediaId) {
  const media = await wpClient.get(`media/${mediaId}`);
  return media.data;
}