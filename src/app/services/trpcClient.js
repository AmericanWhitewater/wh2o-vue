import { createTRPCClient, httpBatchLink } from '@trpc/client';
import transformer from 'trpc-transformer';

import { trpcApiUrl } from '@/app/environment'

export const trpcClient = createTRPCClient({
  links: [
    httpBatchLink({
      url: trpcApiUrl,
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