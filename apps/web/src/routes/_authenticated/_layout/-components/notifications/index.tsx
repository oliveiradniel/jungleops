import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useListReadNotifications } from '@/app/hooks/queries/use-list-read-notifications';
import { useListUnreadNotifications } from '@/app/hooks/queries/use-list-unread-notifications copy';
import { useReadNotification } from '@/app/hooks/mutations/use-read-notification';
import { useReadAllNotifications } from '@/app/hooks/mutations/use-read-all-notifications';

import { NotificationsContext } from './notifications-context';

import { toast } from '@/app/utils/toast';
import { invalidateQueries } from '@/app/utils/invalidate-queries';

import { NotificationsPopover } from './notifications-popover';

export function Notifications() {
  const queryClient = useQueryClient();

  const [typeNotifications, setTypeNotifications] = useState<'read' | 'unread'>(
    'unread',
  );
  const [updatedNotificationId, setUpdatedNotificationId] = useState<
    string | null
  >(null);

  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = new Set(
    taskDeletionAuditLogsList.map(({ task }) => task.id),
  );

  const { readNotifications } = useListReadNotifications();
  const { unreadNotifications } = useListUnreadNotifications();
  const { readNotification, isReadNotificationLoading } = useReadNotification();
  const { readAllNotifications, isReadAllNotificationsLoading } =
    useReadAllNotifications();

  const inactiveTasksOfReadNotifications = readNotifications.filter(
    ({ metadata }) => deletedTaskIds.has(metadata.task.id),
  );
  const activeTasksOfReadNotifications = readNotifications.filter(
    ({ metadata }) => !deletedTaskIds.has(metadata.task.id),
  );

  const inactiveTasksOfUnreadNotifications = unreadNotifications.filter(
    ({ metadata }) => deletedTaskIds.has(metadata.task.id),
  );
  const activeTasksOfUnreadNotifications = unreadNotifications.filter(
    ({ metadata }) => !deletedTaskIds.has(metadata.task.id),
  );

  const activeNotifications =
    typeNotifications === 'read'
      ? activeTasksOfReadNotifications
      : activeTasksOfUnreadNotifications;

  const inactiveNotifications =
    typeNotifications === 'read'
      ? inactiveTasksOfReadNotifications
      : inactiveTasksOfUnreadNotifications;

  const notificationsCount = unreadNotifications.length;

  const emptyNotifications =
    activeNotifications.length === 0 && inactiveNotifications.length === 0;

  function handleToggleTypeNotification(type: 'read' | 'unread') {
    setTypeNotifications(type);
  }

  async function handleReadNotification(notificationId: string) {
    try {
      if (typeNotifications === 'read' || isReadAllNotificationsLoading) return;

      setUpdatedNotificationId(notificationId);

      await readNotification(notificationId);

      invalidateQueries({
        queryClient,
        invalidateQuery: [
          { queryKey: ['read-notifications'] },
          { queryKey: ['unread-notifications'] },
        ],
      });
    } catch {
      toast({
        type: 'error',
        description: 'Houve um erro ao ler a notificação!',
      });
    } finally {
      setUpdatedNotificationId(null);
    }
  }

  async function handleReadAllNotifications() {
    try {
      await readAllNotifications();

      invalidateQueries({
        queryClient,
        invalidateQuery: [
          { queryKey: ['read-notifications'] },
          { queryKey: ['unread-notifications'] },
        ],
      });
    } catch {
      toast({
        type: 'error',
        description: 'Houve um erro ao ler todas as notificações!',
      });
    }
  }

  return (
    <NotificationsContext.Provider
      value={{
        notificationsCount,
        activeNotifications,
        inactiveNotifications,
        typeNotifications,
        emptyNotifications,
        unreadNotificationsCount: unreadNotifications.length,
        readNotificationsCount: readNotifications.length,
        updatedNotificationId,
        isReadNotificationLoading,
        isReadAllNotificationsLoading,
        handleToggleTypeNotification,
        handleReadNotification,
        handleReadAllNotifications,
      }}
    >
      <NotificationsPopover />
    </NotificationsContext.Provider>
  );
}
