import { getAccessToken } from '@/app/utils/access-token';

import type { IAuthService } from '../contracts/iauth-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type { LoginData, RegisterData } from '@/types/auth-data';
import type { SessionPayload } from '@challenge/shared';

export class AuthService implements IAuthService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  login(body: LoginData, config?: HttpRequestConfig): Promise<SessionPayload> {
    return this.httpClient.post<SessionPayload>('/auth/login', body, {
      ...config,
      withCredentials: true,
    });
  }

  register(
    body: RegisterData,
    config?: HttpRequestConfig,
  ): Promise<SessionPayload> {
    return this.httpClient.post<SessionPayload>('/auth/register', body, {
      ...config,
      withCredentials: true,
    });
  }

  refresh(config?: HttpRequestConfig): Promise<SessionPayload> {
    return this.httpClient.post<SessionPayload>('/auth/refresh', null, {
      ...config,
      withCredentials: true,
    });
  }

  session(config?: HttpRequestConfig): Promise<SessionPayload> {
    const accessToken = getAccessToken();

    return this.httpClient.get<SessionPayload>('/auth/get-active-user', {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async logout(config?: HttpRequestConfig): Promise<void> {
    await this.httpClient.post<void>('/auth/logout', {
      ...config,
      withCredentials: true,
    });
  }
}
