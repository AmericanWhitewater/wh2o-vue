import { createTRPCClient, httpBatchLink } from '@trpc/client';
import transformer from 'trpc-transformer';

import { reachApiUrl } from '@/app/environment'


export const reachClient = createTRPCClient({
  links: [
    httpBatchLink({
      url: reachApiUrl,
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