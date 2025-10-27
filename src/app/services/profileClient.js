import { createTRPCClient, httpBatchLink } from '@trpc/client';
import transformer from 'trpc-transformer';

import { profileApiUrl } from '@/app/environment'

export const profileClient = createTRPCClient({
  links: [
    httpBatchLink({
      url: profileApiUrl || "", // github actions fails tests without this
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
      transformer
    }),
  ],
});