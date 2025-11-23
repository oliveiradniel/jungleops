import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/app/hooks/use-auth';

import { LoginSchema } from '@/app/schemas/auth-schema';
import type { LoginData } from '@/types/auth-data';

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const { handleLogin, isLoginLoading } = useAuth();

  const handleSubmit = hookFormHandleSubmit((data: LoginData) => {
    handleLogin(data);
  });

  const emailErrorMessage = errors.email?.message;
  const passwordErrorMessage = errors.password?.message;
  const isFormInvalid = !!emailErrorMessage || !!passwordErrorMessage;

  return {
    register,
    handleSubmit,
    emailErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isLoginLoading,
  };
}
