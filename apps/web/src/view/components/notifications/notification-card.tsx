import { useQueryClient } from '@tanstack/react-query';
import { useReadNotification } from '@/app/hooks/mutations/use-read-notification';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { formatDateToBR } from '@/app/utils/format-date-br';
import { cn } from '@/lib/utils';
import { invalidateQueries } from '@/app/utils/invalidate-queries';

import { Link } from '@tanstack/react-router';
import { Spinner } from '../ui/spinner';
import { useState } from 'react';
import { toast } from '@/app/utils/toast';

import { type LucideIcon } from 'lucide-react';
import type { Notification } from '@/app/entities/notification';
import type { NotificationKind } from '@challenge/shared';

interface NotificationCardProps {
  notification: Notification;
  message: string;
  kind: NotificationKind;
  icon: LucideIcon;
}

export function NotificationCard({
  notification,
  message,
  kind,
  icon: Icon,
}: NotificationCardProps) {
  const queryClient = useQueryClient();

  const [updatedNotificationId, setUpdatedNotificationId] = useState<
    string | null
  >(null);

  const { readNotification, isReadNotificationLoading } = useReadNotification();

  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map(({ task }) => task.id);
  const thisTaskDeleted = deletedTaskIds.includes(
    notification.metadata.task.id,
  );

  const username = notification.metadata.author.username as string;
  const parsedCreatedAt = formatDateToBR(notification.createdAt);

  async function handleReadNotifications(notificationId: string) {
    try {
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

  const content = (
    <div
      className={cn(
        'group flex cursor-pointer items-start gap-2 rounded-sm p-4 shadow-xs transition-all duration-300 ease-linear',
        thisTaskDeleted
          ? 'opacity-70'
          : 'hover:-translate-y-0.5 hover:shadow-sm',
      )}
    >
      <div
        className={cn(
          'relative flex size-10 items-center justify-center rounded-full',
          kind === 'task.created' && 'bg-primary/30',
          kind === 'task.updated' && 'bg-blue-500/30',
          kind === 'task.deleted' && 'bg-destructive/30',
          kind === 'task.assigned' && 'bg-teal-500/30',
          kind === 'task.unassigned' && 'bg-slate-500/30',
          kind === 'task.comment.created' && 'bg-purple-500/30',
        )}
      >
        <Icon
          className={cn(
            'size-5',
            kind === 'task.created' && 'text-primary',
            kind === 'task.updated' && 'text-blue-500',
            kind === 'task.deleted' && 'text-destructive',
            kind === 'task.assigned' && 'text-teal-500',
            kind === 'task.unassigned' && 'text-slate-500',
            kind === 'task.comment.created' && 'text-purple-500',
          )}
        />

        {isReadNotificationLoading &&
          updatedNotificationId === notification.id && (
            <Spinner className="text-background absolute size-6" />
          )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-start text-sm leading-snug">
          <span className="font-medium">{username}</span> {message}
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs">{parsedCreatedAt}</p>

          <span
            className={cn(
              'hidden text-xs group-hover:inline-flex',
              thisTaskDeleted ? 'text-destructive' : 'text-primary',
            )}
          >
            {thisTaskDeleted ? 'Tarefa excluída' : '↗ Visualizar tarefa'}
          </span>
        </div>
      </div>
    </div>
  );

  if (thisTaskDeleted) {
    return (
      <button onClick={() => handleReadNotifications(notification.id)}>
        {content}
      </button>
    );
  }

  return (
    <Link
      to={'/tasks/$taskId'}
      params={{ taskId: notification.metadata.task.id }}
      onClick={() => handleReadNotifications(notification.id)}
    >
      {content}
    </Link>
  );
}
