import { useEffect } from 'react';
import { useMessaging } from './use-messaging';

import { getNotificationsSocket } from '@/app/utils/notifications.socket';

import { SOCKET_SIGNAL_KEYS } from '@challenge/shared';

export function useSignals({ userId }: { userId?: string }) {
  const {
    sinalizeTaskUpdated,
    sinalizeTaskCommentCreated,
    sinalizeTaskAuditLog,
  } = useMessaging({
    userId,
  });

  const { TASK_UPDATED, TASK_COMMENT_CREATED, TASK_AUDIT_LOG } =
    SOCKET_SIGNAL_KEYS;

  useEffect(() => {
    if (!userId) return;

    const socket = getNotificationsSocket(userId);

    socket.on(TASK_UPDATED, sinalizeTaskUpdated);
    socket.on(TASK_COMMENT_CREATED, sinalizeTaskCommentCreated);
    socket.on(TASK_AUDIT_LOG, sinalizeTaskAuditLog);

    return () => {
      socket.off(TASK_UPDATED, sinalizeTaskUpdated);
      socket.off(TASK_AUDIT_LOG, sinalizeTaskAuditLog);
    };
  }, [userId]);
}
