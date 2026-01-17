import { wpClient } from "@/app/http";

export async function getReachWPID(id) {
  return wpClient.get(`reachid/?slug=${id}`)
    .then((res) => {
      if (res && res.data && res.data.length > 0) {
          return res.data[0].id;
      }
      return null;
    });
}