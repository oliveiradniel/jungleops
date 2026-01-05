import type { Notification } from '@challenge/shared';

export abstract class INotificationsService {
  abstract listReadNotifications(): Promise<Notification[]>;
  abstract listUnreadNotifications(): Promise<Notification[]>;
  abstract read(notificactionId: string): Promise<void>;
  abstract readAllNotifications(): Promise<void>;
}
