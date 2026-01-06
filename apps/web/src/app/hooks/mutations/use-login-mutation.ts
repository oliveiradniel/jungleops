import { useMutation } from '@tanstack/react-query';

import { makeAuthService } from '@/app/factories/make-auth-service';

import type { LoginData } from '@/types/auth-data';

export function useLoginMutation() {
  const authService = makeAuthService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
  });

  return {
    login: mutateAsync,
    isLoginLoading: isPending,
  };
}
