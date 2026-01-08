import { queryOptions } from '@tanstack/react-query';

import { makeAuthService } from '@/app/factories/make-auth-service';

const authService = makeAuthService();

export const sessionQuery = queryOptions({
  queryKey: ['session'],
  queryFn: async () => {
    try {
      const data = await authService.session();

      return data.user;
    } catch {
      return null;
    }
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});
