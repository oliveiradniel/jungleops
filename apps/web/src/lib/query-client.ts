import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: false,
    },
  },
});
