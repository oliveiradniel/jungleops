import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { getConfig } from 'src/shared/config/config.helper';

import { type Notification } from '@challenge/shared';

@Injectable()
export class NotificationsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.baseURL = getConfig(configService).NOTIFICATIONS_SERVICE_BASE_URL;
  }

  async listReadNotificationsByUserId(userId: string): Promise<Notification[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Notification[]>(`${this.baseURL}/read/${userId}`),
    );

    return data;
  }

  async listUnreadNotificationsByUserId(
    userId: string,
  ): Promise<Notification[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Notification[]>(`${this.baseURL}/unread/${userId}`),
    );

    return data;
  }

  async read(notificationId: string): Promise<void> {
    await firstValueFrom(
      this.httpService.patch<void>(`${this.baseURL}/${notificationId}`),
    );
  }

  async delete(notificationId: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(`${this.baseURL}/${notificationId}`),
    );
  }
}
