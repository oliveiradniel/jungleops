import { useCallback, useLayoutEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { AuthContext, type LoadingType } from '@/app/contexts/auth-context';

import { useLoginMutation } from '../hooks/mutations/use-login-mutation';
import { useRegisterMutation } from '../hooks/mutations/use-register-mutation';
import { useLogoutMutation } from '../hooks/mutations/use-logout-mutation';
import { useNotifications } from '../hooks/realtime/use-notifications';
import { useSignals } from '../hooks/realtime/use-signals';

import { sessionQuery } from '@/lib/queries/session';

import { router } from '@/router';
import { httpClient } from '../core/infra/http-client';
import { makeAuthService } from '../factories/make-auth-service';

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/access-token';
import { toast } from '../utils/toast';

import { AuthLoadingScreen } from '@/view/components/auth-loading-screen';

import { disconnectNotificationsSocket } from '../utils/notifications.socket';

import type { LoginData, RegisterData } from '@/types/auth-data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isPending: isSessionLoading } = useQuery(sessionQuery);

  const [isNavigating, setIsNavigating] = useState(false);

  const { login: loginMutate, isLoginLoading } = useLoginMutation();
  const { register: registerMutate, isRegisterLoading } = useRegisterMutation();
  const { logout: logoutMutate, isLogoutLoading } = useLogoutMutation();

  useNotifications({ userId: user?.id });
  useSignals({ userId: user?.id });

  const isLoadingGlobal = isSessionLoading || isLogoutLoading || isNavigating;
  const loadingType: LoadingType = isSessionLoading
    ? 'is-session'
    : isLogoutLoading
      ? 'is-logout'
      : 'is-login/is-register';

  useLayoutEffect(() => {
    const request = httpClient.interceptors.request.use((config) => {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(request);
    };
  }, []);

  useLayoutEffect(() => {
    const response = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.url === '/auth/refresh') {
          removeAccessToken();

          queryClient.invalidateQueries({ queryKey: ['session'] });
          queryClient.setQueryData(['session'], null);

          await router.invalidate();

          return Promise.reject(error);
        }

        if (error.response && error.response.status !== 401) {
          return Promise.reject(error);
        }

        const accessTokenExists = getAccessToken();
        if (!accessTokenExists) {
          return Promise.reject(error);
        }

        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        const authService = makeAuthService();

        try {
          const { accessToken } = await authService.refresh();

          setAccessToken(accessToken);

          return httpClient(originalRequest);
        } catch (refreshError) {
          if (error.response && error.response.status === 401) {
            toast({
              type: 'error',
              description: 'Sua sessão expirou, faça login novamente.',
            });
          }

          removeAccessToken();

          queryClient.invalidateQueries({ queryKey: ['session'] });

          return Promise.reject(refreshError);
        }
      },
    );

    return () => {
      httpClient.interceptors.response.eject(response);
    };
  }, [queryClient]);

  const handleLogin = useCallback(
    async (data: LoginData) => {
      try {
        const { accessToken } = await loginMutate(data);
        setAccessToken(accessToken);
        setIsNavigating(true);

        const authService = makeAuthService();
        const { user } = await authService.session(accessToken);

        await queryClient.setQueryData(['session'], user);

        await router.invalidate();
        router.navigate({ to: '/tasks' });
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
      } finally {
        setIsNavigating(false);
      }
    },
    [loginMutate, queryClient],
  );

  const handleRegister = useCallback(
    async (data: RegisterData) => {
      try {
        const { accessToken } = await registerMutate(data);
        setAccessToken(accessToken);
        setIsNavigating(true);

        const authService = makeAuthService();
        const { user } = await authService.session(accessToken);

        await queryClient.setQueryData(['session'], user);

        await router.invalidate();
        router.navigate({ to: '/tasks' });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.data.message === 'This email is already in use.'
          ) {
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
      } finally {
        setIsNavigating(false);
      }
    },
    [registerMutate, queryClient],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutate();
      removeAccessToken();
      setIsNavigating(true);

      await queryClient.invalidateQueries({ queryKey: ['session'] });

      await router.invalidate();
      router.navigate({ to: '/login', search: { redirect: '/tasks' } });

      disconnectNotificationsSocket();
    } catch {
      toast({
        type: 'error',
        description:
          'Não foi possível fazer logout! Tente novamente mais tarde.',
      });
    } finally {
      setIsNavigating(false);
    }
  }, [logoutMutate, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        handleLogin,
        handleRegister,
        handleLogout,
        isLoginLoading,
        isRegisterLoading,
        isLogoutLoading,
      }}
    >
      {isLoadingGlobal ? (
        <AuthLoadingScreen loadingType={loadingType} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
