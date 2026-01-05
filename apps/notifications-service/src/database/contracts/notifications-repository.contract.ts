import { Notification, CreateNotificationData } from '@challenge/shared';

export abstract class INotificationsRepository {
  abstract getById(id: string): Promise<Notification | null>;
  abstract listReadNotificationsByUserId(
    userId: string,
  ): Promise<Notification[]>;
  abstract listUnreadNotificationsByUserId(
    userId: string,
  ): Promise<Notification[]>;
  abstract create(data: CreateNotificationData): Promise<Notification>;
  abstract read(id: string): Promise<void>;
  abstract readAllNotificationsByUserId(userId: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
