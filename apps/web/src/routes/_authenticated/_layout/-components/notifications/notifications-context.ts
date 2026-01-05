import { createContext } from 'react';

import type { Notification } from '@/app/entities/notification';

export type NotificationType = 'read' | 'unread';

interface NotificationsContextValues {
  notificationsCount: number;
  activeNotifications: Notification[];
  inactiveNotifications: Notification[];
  typeNotifications: NotificationType;
  emptyNotifications: boolean;
  unreadNotificationsCount: number;
  readNotificationsCount: number;
  updatedNotificationId: string | null;
  isReadNotificationLoading: boolean;
  isReadAllNotificationsLoading: boolean;
  handleToggleTypeNotification: (type: NotificationType) => void;
  handleReadNotification: (notificationId: string) => void;
  handleReadAllNotifications: () => void;
}

export const NotificationsContext = createContext(
  {} as NotificationsContextValues,
);
