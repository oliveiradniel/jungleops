import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/app/hooks/use-auth';

import { RegisterSchema } from '@/app/schemas/auth-schema';
import type { RegisterData } from '@/types/auth-data';

export function useRegisterController() {
  const {
    register,
    handleSubmit: reactHookHandleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const { handleRegister, isRegisterLoading } = useAuth();

  const handleSubmit = reactHookHandleSubmit((data: RegisterData) => {
    handleRegister(data);
  });

  const emailErrorMessage = errors.email?.message;
  const usernameErrorMessage = errors.username?.message;
  const passwordErrorMessage = errors.password?.message;
  const isFormInvalid =
    !!emailErrorMessage || !!usernameErrorMessage || !!passwordErrorMessage;

  return {
    register,
    handleSubmit,
    emailErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isRegisterLoading,
  };
}
