import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  AuthPayload,
  SessionPayload,
  SignInData,
  SignUpData,
  UserWithoutPassword,
} from '@challenge/shared';

@Injectable()
export class AuthService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseURL = getConfig(this.configService).AUTH_SERVICE_BASE_URL;
  }

  async signIn(dataToSignIn: SignInData): Promise<AuthPayload> {
    const { email, password } = dataToSignIn;

    const { data } = await firstValueFrom(
      this.httpService.post<AuthPayload, SignInData>(`${this.baseURL}/login`, {
        email,
        password,
      }),
    );

    return data;
  }

  async signUp(dataToSignUp: SignUpData): Promise<AuthPayload> {
    const { email, username, password } = dataToSignUp;

    const { data } = await firstValueFrom(
      this.httpService.post<AuthPayload, SignUpData>(
        `${this.baseURL}/register`,
        { email, username, password },
      ),
    );

    return data;
  }

  async refresh(userId: string): Promise<SessionPayload> {
    const { data } = await firstValueFrom(
      this.httpService.post<SessionPayload, { userId: string }>(
        `${this.baseURL}/refresh`,
        {
          userId: userId!,
        },
      ),
    );

    return data;
  }

  async findActiveUser(userId: string): Promise<{ user: UserWithoutPassword }> {
    const { data } = await firstValueFrom(
      this.httpService.get<{ user: UserWithoutPassword }>(
        `${this.baseURL}/get-active-user/${userId}`,
      ),
    );

    return data;
  }
}
