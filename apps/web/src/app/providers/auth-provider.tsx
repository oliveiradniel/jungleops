import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { AuthContext } from '@/app/contexts/auth-context';

import { useSessionQuery } from '../hooks/queries/use-session-query';
import { useLoginMutation } from '../hooks/mutations/use-login-mutation';
import { useRegisterMutation } from '../hooks/mutations/use-register-mutation';
import { useLogoutMutation } from '../hooks/mutations/use-logout-mutation';

import { AuthLoadingScreen } from '@/view/components/auth-loading-screen';

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/access-token';

import { toast } from '../utils/toast';

import type { LoginData, RegisterData } from '@/types/auth-data';
import type { UserWithoutPassword } from '@challenge/shared';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [activeUser, setActiveUser] = useState<UserWithoutPassword | null>(
    null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isGetUser, setIsGetUser] = useState(false);

  const { user, isSessionLoading } = useSessionQuery({
    enabled: isGetUser,
  });
  const { login: loginMutate, isLoginLoading } = useLoginMutation();
  const { register: registerMutate, isRegisterLoading } = useRegisterMutation();
  const { logout: logoutMutate, isLogoutLoading } = useLogoutMutation();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsGetUser(true);
    }

    if (token && user && isGetUser) {
      setActiveUser(user);
      setIsAuthenticated(true);
      setIsGetUser(false);
    } else {
      setActiveUser(null);
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleLogin = useCallback(async (data: LoginData) => {
    try {
      const { user: userData, accessToken } = await loginMutate(data);

      setActiveUser(userData);
      setIsAuthenticated(true);
      setAccessToken(accessToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Invalid credentials.') {
          toast({
            type: 'error',
            description:
              'Suas crendeciais não correspondem a uma conta em nosso sistema.',
          });
          return;
        }
      }

      toast({
        type: 'error',
        description:
          'Não foi possível fazer login! Tente novamente mais tarde.',
      });
    }
  }, []);

  const handleRegister = useCallback(async (data: RegisterData) => {
    try {
      const { user: userData, accessToken } = await registerMutate(data);

      setActiveUser(userData);
      setIsAuthenticated(true);
      setAccessToken(accessToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'This email is already in use.') {
          toast({
            type: 'error',
            description: 'O e-mail informado já está em uso.',
          });

          return;
        }
        if (
          error.response?.data.message === 'This username is already in use.'
        ) {
          toast({
            type: 'error',
            description: 'O nome de usuário informado já está em uso.',
          });

          return;
        }
      }

      toast({
        type: 'error',
        description:
          'Não foi possível se cadastrar! Tente novamente mais tarde.',
      });
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutate();

      setActiveUser(null);
      setIsAuthenticated(false);
      removeAccessToken();
    } catch (error) {
      toast({
        type: 'error',
        description:
          'Não foi possível fazer logout! Tente novamente mais tarde.',
      });
    }
  }, []);

  if (isSessionLoading && !user) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: activeUser,
        isAuthenticated,
        handleLogin,
        handleRegister,
        handleLogout,
        isSessionLoading,
        isLoginLoading,
        isRegisterLoading,
        isLogoutLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
