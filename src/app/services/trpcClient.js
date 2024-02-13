import { createTRPCClient, httpBatchLink } from '@trpc/client';

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
    }),
  ],
});