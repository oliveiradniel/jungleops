import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

import type { QueryClient } from '@tanstack/react-query';

export const router = createRouter({
  routeTree: routeTree,
  context: {} as { queryClient: QueryClient },
});
