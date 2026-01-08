import { NotificationKind } from "./notification-kind.type";

export interface CreateNotificationData {
  userId: string;
  kind: NotificationKind;
  metadata: Record<string, any>;
}
