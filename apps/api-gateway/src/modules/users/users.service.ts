import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { first, firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import { UserWithoutPassword } from '@challenge/shared';

@Injectable()
export class UsersService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseURL = getConfig(this.configService).USERS_SERVICE_BASE_URL;
  }

  async find(userId: string): Promise<UserWithoutPassword> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserWithoutPassword>(`${this.baseURL}/${userId}`),
    );

    return data;
  }

  async findUsers(userIds: string[]): Promise<UserWithoutPassword[]> {
    const { data } = await firstValueFrom(
      this.httpService.post<UserWithoutPassword[], { ids: string[] }>(
        `${this.baseURL}/get-users`,
        {
          ids: userIds,
        },
      ),
    );

    return data;
  }

  async listUsers(): Promise<UserWithoutPassword[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserWithoutPassword[]>(`${this.baseURL}/list`),
    );

    return data;
  }

  async listUserIds(): Promise<string[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<string[]>(`${this.baseURL}/ids`),
    );

    return data;
  }
}
