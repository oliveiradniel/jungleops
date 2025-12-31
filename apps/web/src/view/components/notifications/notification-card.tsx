import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { formatDateToBR } from '@/app/utils/format-date-br';

import { cn } from '@/lib/utils';

import { Link } from '@tanstack/react-router';

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
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map(({ task }) => task.id);
  const thisTaskDeleted = deletedTaskIds.includes(
    notification.metadata.task.id,
  );

  const username = notification.metadata.author.username as string;
  const parsedCreatedAt = formatDateToBR(notification.createdAt);

  const content = (
    <div
      className={cn(
        'group flex cursor-pointer items-start gap-2 rounded-sm p-4 shadow-xs transition-all duration-300 ease-linear',
        thisTaskDeleted
          ? 'cursor-default opacity-70'
          : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-sm',
      )}
    >
      <div
        className={cn(
          'flex size-10 items-center justify-center rounded-full',
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

  if (thisTaskDeleted) return content;

  return (
    <Link
      to={'/tasks/$taskId'}
      params={{ taskId: notification.metadata.task.id }}
    >
      {content}
    </Link>
  );
}
