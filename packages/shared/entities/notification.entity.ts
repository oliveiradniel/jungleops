import type { NotificationKind } from "../types/notification/notification-kind.type.js";

export interface Notification {
  id: string;
  userId: string;
  kind: NotificationKind;
  read?: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
}
