import { useMutation } from '@tanstack/react-query';

import { makeAuthService } from '@/app/factories/make-auth-service';

export function useLogoutMutation() {
  const authService = makeAuthService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.logout(),
  });

  return {
    logout: mutateAsync,
    isLogoutLoading: isPending,
  };
}
