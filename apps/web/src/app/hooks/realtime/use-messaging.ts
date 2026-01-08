import { useQueryClient } from '@tanstack/react-query';

import { toast } from '@/app/utils/toast';

import {
  invalidateQueries,
  type InvalidateQuery,
} from '@/app/utils/invalidate-queries';

import type {
  TaskAssignedNotification,
  TaskAuditLogSignal,
  TaskCommentCreatedNotification,
  TaskCommentCreatedSignal,
  // TaskDeletedNotification,
  TaskPriorityUpdatedNotification,
  TaskStatusUpdatedNotification,
  TaskTermUpdatedNotification,
  TaskTitleUpdatedNotification,
  TaskUnassignedNotification,
  TaskUpdatedSignal,
} from '@challenge/shared';
import { useCallback } from 'react';

export function useMessaging({ userId }: { userId?: string }) {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = useCallback(
    (invalidateQuery: InvalidateQuery[]) => {
      invalidateQueries({
        queryClient,
        invalidateQuery,
      });
    },
    [queryClient],
  );

  const handleInvalidateUnreadNotifications = useCallback(() => {
    handleInvalidateQueries([{ queryKey: ['unread-notifications'] }]);
  }, [handleInvalidateQueries]);

  const onTaskCreated = useCallback(() => {
    toast({
      type: 'info',
      description: 'Uma nova tarefa foi adicionada.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
    handleInvalidateUnreadNotifications();
  }, [handleInvalidateQueries, handleInvalidateUnreadNotifications]);

  const onTaskTitleUpdated = useCallback(
    (payload: TaskTitleUpdatedNotification) => {
      toast({
        type: 'info',
        description:
          'Uma tarefa da qual você participa teve o título alterado.',
      });

      handleInvalidateQueries([
        { queryKey: ['task', payload.task.id] },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const onTaskStatusUpdated = useCallback(
    (payload: TaskStatusUpdatedNotification) => {
      toast({
        type: 'info',
        description:
          'Uma tarefa da qual você participa teve o status alterado.',
      });

      handleInvalidateQueries([
        { queryKey: ['task', payload.task.id] },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const onTaskPriorityUpdated = useCallback(
    (payload: TaskPriorityUpdatedNotification) => {
      toast({
        type: 'info',
        description:
          'Uma tarefa da qual você participa teve a prioriedade alterada.',
      });

      handleInvalidateQueries([
        { queryKey: ['task', payload.task.id] },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const onTaskTermUpdated = useCallback(
    (payload: TaskTermUpdatedNotification) => {
      toast({
        type: 'info',
        description: 'Uma tarefa da qual você participa teve o prazo alterado.',
      });

      handleInvalidateQueries([
        { queryKey: ['task', payload.task.id] },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const onTaskAssigned = useCallback(
    (payload: TaskAssignedNotification) => {
      const { task } = payload;

      if (task.participantIds.includes(userId!)) {
        toast({
          type: 'info',
          description:
            'Um novo usuário foi atribuido a uma tarefa da qual você participa.',
        });
      }

      if (task.addedParticipantIds.includes(userId!)) {
        toast({
          type: 'info',
          description: 'Você foi atribuido à uma tarefa.',
        });
      }

      handleInvalidateQueries([{ queryKey: ['task', task.id] }]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications, userId],
  );

  const onTaskUnassigned = useCallback(
    (payload: TaskUnassignedNotification) => {
      const { task } = payload;

      if (task.participantIds.includes(userId!)) {
        toast({
          type: 'info',
          description:
            'Um participante foi removido de uma tarefa que você participa.',
        });
      }

      if (task.removedParticipantIds.includes(userId!)) {
        toast({
          type: 'info',
          description: 'Você foi removido de uma tarefa.',
        });
      }

      handleInvalidateQueries([{ queryKey: ['task', task.id] }]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications, userId],
  );

  const onTaskDeleted = useCallback(() => {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participava foi excluída.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
    handleInvalidateUnreadNotifications();
  }, [handleInvalidateQueries, handleInvalidateUnreadNotifications]);

  const onTaskCommentCreated = useCallback(
    (payload: TaskCommentCreatedNotification) => {
      const { task } = payload;

      toast({
        type: 'info',
        description:
          'Uma tarefa da qual você participa tem um novo comentário.',
      });

      handleInvalidateQueries([
        { queryKey: ['comments', task.id], exact: false },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const sinalizeTaskUpdated = useCallback(
    (payload: TaskUpdatedSignal) => {
      const taskId = payload.task.id;

      handleInvalidateQueries([
        { queryKey: ['users-tasks', taskId] },
        { queryKey: ['task', taskId] },
        { queryKey: ['tasks'], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const sinalizeTaskCommentCreated = useCallback(
    (payload: TaskCommentCreatedSignal) => {
      handleInvalidateQueries([
        { queryKey: ['comments', payload.task.id], exact: false },
      ]);
      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  const sinalizeTaskAuditLog = useCallback(
    (payload: TaskAuditLogSignal) => {
      const { action } = payload;

      if (action === 'CREATE') {
        handleInvalidateQueries([{ queryKey: ['task-creation-audit-logs'] }]);
      } else if (action === 'UPDATE') {
        handleInvalidateQueries([{ queryKey: ['task-update-audit-logs'] }]);
      } else if (action === 'DELETE') {
        handleInvalidateQueries([{ queryKey: ['task-deletion-audit-logs'] }]);
      }

      handleInvalidateUnreadNotifications();
    },
    [handleInvalidateQueries, handleInvalidateUnreadNotifications],
  );

  return {
    onTaskCreated,
    onTaskTitleUpdated,
    onTaskStatusUpdated,
    onTaskPriorityUpdated,
    onTaskTermUpdated,
    onTaskAssigned,
    onTaskUnassigned,
    onTaskDeleted,
    onTaskCommentCreated,
    sinalizeTaskUpdated,
    sinalizeTaskCommentCreated,
    sinalizeTaskAuditLog,
  };
}
