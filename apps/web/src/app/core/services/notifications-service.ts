import type { Notification } from '@/app/entities/notification';

import type { INotificationsService } from '../contracts/inotifications-service';
import type { IHttpClient } from '../contracts/ihttp-client';

export class NotificationsService implements INotificationsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  listReadNotifications(): Promise<Notification[]> {
    return this.httpClient.get<Notification[]>('/notifications/read');
  }

  listUnreadNotifications(): Promise<Notification[]> {
    return this.httpClient.get<Notification[]>('notifications/unread');
  }

  read(notificationId: string): Promise<void> {
    return this.httpClient.patch(`notifications/${notificationId}`);
  }
}
