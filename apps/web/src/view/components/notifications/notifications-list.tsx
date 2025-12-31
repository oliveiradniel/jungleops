import { useAuth } from '@/app/hooks/use-auth';

import { truncateString } from '@/app/utils/truncate-string';
import { formatDateToBR } from '@/app/utils/format-date-br';
import { priorityLabels, statusLabels } from '@/config/labels';

import {
  MessageSquareIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UserMinusIcon,
  UserPlusIcon,
} from 'lucide-react';

import { NotificationCard } from './notification-card';

import type { Notification } from '@/app/entities/notification';
import type { TaskPriority, TaskStatus } from '@challenge/shared';

interface NotificationsListProps {
  notifications: Notification[];
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2 py-4">
      {notifications.map((notification) => {
        const { id, kind, metadata } = notification;
        const userId = user?.id!;

        const removedParticipantsIds = metadata.task
          .removedParticipantIds as string[];
        const addedParticipantIds = metadata.task
          .addedParticipantIds as string[];

        const taskTitle = metadata.task.title;
        const newTitle = metadata.task?.newTitle;
        const oldTitle = metadata.task?.oldTitle;
        const priority =
          priorityLabels[metadata.task.priority as TaskPriority]?.toLowerCase();
        const newPriority =
          priorityLabels[
            metadata.task?.newPriority as TaskPriority
          ]?.toLowerCase();
        const oldPriority =
          priorityLabels[
            metadata.task?.oldPriority as TaskPriority
          ]?.toLowerCase();
        const newStatus =
          statusLabels[metadata.task?.newStatus as TaskStatus]?.toLowerCase();
        const oldStatus =
          statusLabels[metadata.task?.oldStatus as TaskStatus]?.toLowerCase();
        const oldTerm = formatDateToBR(metadata.task?.oldTerm);
        const newTerm = formatDateToBR(metadata.task?.newTerm);
        const comment = metadata.task?.comment;

        const createdMessage = `adicionou uma
                    nova tarefa com prioridade ${priority}`;
        const updatedTitleMessage = `renomeou a tarefa "${oldTitle}" para "${newTitle}"`;
        const updatedStatusMessage = `alterou o status da tarefa "${taskTitle}" de ${oldStatus} para ${newStatus}`;
        const updatedPriorityMessage = `alterou a prioridade da tarefa "${taskTitle}" de ${oldPriority} para ${newPriority}`;
        const updatedTermMessage = `alterou o prazo da tarefa "${taskTitle}" de ${oldTerm} para ${newTerm}`;
        const deletedMessage = `excluiu a tarefa "${taskTitle}" da qual você participava`;
        const createdCommentMessage = `adicionou um novo comentário "${truncateString(comment, 20)}" na tarefa "${taskTitle}"`;
        const assignedMessage = addedParticipantIds?.includes(userId)
          ? `te adicionou à tarefa ${taskTitle}`
          : `adicionou ${addedParticipantIds?.length} ${addedParticipantIds?.length > 1 ? 'novos usuários' : 'novo usuário'} à tarefa "${taskTitle}"`;
        const unassignedMessage = removedParticipantsIds?.includes(userId)
          ? `te removeu da tarefa "${taskTitle}"`
          : `removeu ${removedParticipantsIds?.length} ${removedParticipantsIds?.length > 1 ? 'participantes' : 'participante'} da tarefa "${taskTitle}"`;

        if (kind === 'task.created') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={createdMessage}
              kind="task.created"
              icon={PlusIcon}
            />
          );
        }

        if (kind === 'task.title.updated') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={updatedTitleMessage}
              kind="task.updated"
              icon={PencilIcon}
            />
          );
        }

        if (kind === 'task.status.updated') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={updatedStatusMessage}
              kind="task.updated"
              icon={PencilIcon}
            />
          );
        }

        if (kind === 'task.priority.updated') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={updatedPriorityMessage}
              kind="task.updated"
              icon={PencilIcon}
            />
          );
        }

        if (kind === 'task.term.updated') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={updatedTermMessage}
              kind="task.updated"
              icon={PencilIcon}
            />
          );
        }

        if (kind === 'task.deleted') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={deletedMessage}
              kind="task.deleted"
              icon={Trash2Icon}
            />
          );
        }

        if (kind === 'task.comment.created') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={createdCommentMessage}
              kind="task.comment.created"
              icon={MessageSquareIcon}
            />
          );
        }

        if (kind === 'task.assigned') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={assignedMessage}
              kind="task.assigned"
              icon={UserPlusIcon}
            />
          );
        }

        if (kind === 'task.unassigned') {
          return (
            <NotificationCard
              key={id}
              notification={notification}
              message={unassignedMessage}
              kind="task.unassigned"
              icon={UserMinusIcon}
            />
          );
        }
      })}
    </div>
  );
}
