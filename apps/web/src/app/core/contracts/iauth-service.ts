import type { LoginData, RegisterData } from '@/types/auth-data';
import type { HttpRequestConfig } from './ihttp-client';

import type { SessionPayload } from '@challenge/shared';

export abstract class IAuthService {
  abstract login(
    body: LoginData,
    config?: HttpRequestConfig,
  ): Promise<SessionPayload>;

  abstract register(
    body: RegisterData,
    config?: HttpRequestConfig,
  ): Promise<SessionPayload>;

  abstract refresh(config?: HttpRequestConfig): Promise<SessionPayload>;

  abstract session(
    accessToken?: string,
    config?: HttpRequestConfig,
  ): Promise<SessionPayload>;

  abstract logout(config?: HttpRequestConfig): Promise<void>;
}
