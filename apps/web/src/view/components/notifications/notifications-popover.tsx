import { useState } from 'react';
import { useListReadNotifications } from '@/app/hooks/queries/use-list-read-notifications';
import { useListUnreadNotifications } from '@/app/hooks/queries/use-list-unread-notifications copy';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { BellIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Notifications } from './notifications';

export function NotificationsPopover() {
  const [typeNotifications, setTypeNotifications] = useState<'read' | 'unread'>(
    'unread',
  );

  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = new Set(
    taskDeletionAuditLogsList.map(({ task }) => task.id),
  );

  const { readNotifications } = useListReadNotifications();
  const { unreadNotifications } = useListUnreadNotifications();

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

  function handleToggleTypeNotification(type: 'read' | 'unread') {
    setTypeNotifications(type);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary relative flex size-8 items-center justify-center rounded-full">
          {notificationsCount > 0 && (
            <div className="bg-destructive absolute top-0 right-0 flex size-5 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full text-[10px]">
              {notificationsCount > 9 ? '9+' : notificationsCount}
            </div>
          )}

          <BellIcon className="text-primary-foreground size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="bg-background max-h-[70vh] w-[400px] overflow-y-auto p-0"
      >
        <Notifications
          activeNotifications={activeNotifications}
          inactiveNotifications={inactiveNotifications}
          unreadNotificationsCount={unreadNotifications.length}
          readNotificationsCount={readNotifications.length}
          typeNotifications={typeNotifications}
          onToggleTypeNotification={handleToggleTypeNotification}
        />
      </PopoverContent>
    </Popover>
  );
}
