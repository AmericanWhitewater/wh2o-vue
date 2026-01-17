import { createTRPCClient, httpBatchLink } from '@trpc/client';
import transformer from 'trpc-transformer';

import { gaugeApiUrl } from '@/app/environment'

export const gaugeClient = createTRPCClient({
  links: [
    httpBatchLink({
      url: gaugeApiUrl || "", // github actions fails tests without this
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
