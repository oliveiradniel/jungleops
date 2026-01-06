import { useEffect } from 'react';
import { useMessaging } from './use-messaging';

import { getNotificationsSocket } from '@/app/utils/notifications.socket';

import { SOCKET_EVENT_KEYS } from '@challenge/shared';

export function useNotifications({ userId }: { userId?: string }) {
  const {
    onTaskCreated,
    onTaskTitleUpdated,
    onTaskStatusUpdated,
    onTaskPriorityUpdated,
    onTaskTermUpdated,
    onTaskAssigned,
    onTaskUnassigned,
    onTaskDeleted,
    onTaskCommentCreated,
  } = useMessaging({ userId });

  const {
    TASK_CREATED,
    TASK_TITLE_UPDATED,
    TASK_STATUS_UPDATED,
    TASK_PRIORITY_UPDATED,
    TASK_TERM_UPDATED,
    TASK_ASSIGNED,
    TASK_UNASSIGNED,
    TASK_DELETED,
    TASK_COMMENT_CREATED,
  } = SOCKET_EVENT_KEYS;

  useEffect(() => {
    if (!userId) return;

    const socket = getNotificationsSocket(userId);

    socket.on(TASK_CREATED, onTaskCreated);
    socket.on(TASK_TITLE_UPDATED, onTaskTitleUpdated);
    socket.on(TASK_STATUS_UPDATED, onTaskStatusUpdated);
    socket.on(TASK_PRIORITY_UPDATED, onTaskPriorityUpdated);
    socket.on(TASK_TERM_UPDATED, onTaskTermUpdated);
    socket.on(TASK_ASSIGNED, onTaskAssigned);
    socket.on(TASK_UNASSIGNED, onTaskUnassigned);
    socket.on(TASK_DELETED, onTaskDeleted);
    socket.on(TASK_COMMENT_CREATED, onTaskCommentCreated);

    return () => {
      socket.off(TASK_CREATED, onTaskCreated);
      socket.off(TASK_TITLE_UPDATED, onTaskTitleUpdated);
      socket.off(TASK_STATUS_UPDATED, onTaskStatusUpdated);
      socket.off(TASK_PRIORITY_UPDATED, onTaskPriorityUpdated);
      socket.off(TASK_TERM_UPDATED, onTaskTermUpdated);
      socket.off(TASK_ASSIGNED, onTaskAssigned);
      socket.off(TASK_UNASSIGNED, onTaskUnassigned);
      socket.off(TASK_DELETED, onTaskDeleted);
      socket.off(TASK_COMMENT_CREATED, onTaskCommentCreated);
    };
  }, [
    userId,
    TASK_CREATED,
    TASK_TITLE_UPDATED,
    TASK_STATUS_UPDATED,
    TASK_PRIORITY_UPDATED,
    TASK_TERM_UPDATED,
    TASK_ASSIGNED,
    TASK_UNASSIGNED,
    TASK_DELETED,
    TASK_COMMENT_CREATED,
    onTaskCreated,
    onTaskTitleUpdated,
    onTaskStatusUpdated,
    onTaskPriorityUpdated,
    onTaskTermUpdated,
    onTaskAssigned,
    onTaskUnassigned,
    onTaskDeleted,
    onTaskCommentCreated,
  ]);
}
