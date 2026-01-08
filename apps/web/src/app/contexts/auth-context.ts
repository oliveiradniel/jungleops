import { createContext } from 'react';

import type { LoginData, RegisterData } from '@/types/auth-data';

import type { UserWithoutPassword } from '@challenge/shared';

export interface AuthContextValue {
  user?: UserWithoutPassword | null;
  isAuthenticated: boolean;
  handleLogin: (data: LoginData) => Promise<void>;
  handleRegister: (data: RegisterData) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isLogoutLoading: boolean;
}

export type LoadingType = 'is-session' | 'is-login/is-register' | 'is-logout';

export const AuthContext = createContext({} as AuthContextValue);
