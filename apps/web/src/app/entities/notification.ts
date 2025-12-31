import type { NotificationKind } from '@challenge/shared';

export interface Notification {
  id: string;
  userId: string;
  kind: NotificationKind;
  read: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
}
