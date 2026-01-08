import type { NotificationKind } from '@challenge/shared';

export interface Notification {
  id: string;
  userId: string;
  kind: NotificationKind;
  read: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>;
  createdAt: Date;
}
