import { useMutation } from '@tanstack/react-query';

import { makeAuthService } from '@/app/factories/make-auth-service';

import type { RegisterData } from '@/types/auth-data';

export function useRegisterMutation() {
  const authService = makeAuthService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
  });

  return {
    register: mutateAsync,
    isRegisterLoading: isPending,
  };
}
