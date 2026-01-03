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

export function useMessaging({ userId }: { userId?: string }) {
  const queryClient = useQueryClient();

  function handleInvalidateQueries(invalidateQuery: InvalidateQuery[]) {
    invalidateQueries({
      queryClient,
      invalidateQuery,
    });
  }

  function handleInvalidateUnreadNotifications() {
    handleInvalidateQueries([{ queryKey: ['unread-notifications'] }]);
  }

  function onTaskCreated() {
    toast({
      type: 'info',
      description: 'Uma nova tarefa foi adicionada.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
    handleInvalidateUnreadNotifications();
  }

  function onTaskTitleUpdated(payload: TaskTitleUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o título alterado.',
    });

    handleInvalidateQueries([
      { queryKey: ['task', payload.task.id] },
      { queryKey: ['tasks'], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function onTaskStatusUpdated(payload: TaskStatusUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o status alterado.',
    });

    handleInvalidateQueries([
      { queryKey: ['task', payload.task.id] },
      { queryKey: ['tasks'], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function onTaskPriorityUpdated(payload: TaskPriorityUpdatedNotification) {
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
  }

  function onTaskTermUpdated(payload: TaskTermUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o prazo alterado.',
    });

    handleInvalidateQueries([
      { queryKey: ['task', payload.task.id] },
      { queryKey: ['tasks'], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function onTaskAssigned(payload: TaskAssignedNotification) {
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
  }

  function onTaskUnassigned(payload: TaskUnassignedNotification) {
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
  }

  function onTaskDeleted() {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participava foi excluída.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
    handleInvalidateUnreadNotifications();
  }

  function onTaskCommentCreated(payload: TaskCommentCreatedNotification) {
    const { task } = payload;

    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa tem um novo comentário.',
    });

    handleInvalidateQueries([
      { queryKey: ['comments', task.id], exact: false },
      { queryKey: ['tasks'], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function sinalizeTaskUpdated(payload: TaskUpdatedSignal) {
    const taskId = payload.task.id;

    handleInvalidateQueries([
      { queryKey: ['users-tasks', taskId] },
      { queryKey: ['task', taskId] },
      { queryKey: ['tasks'], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function sinalizeTaskCommentCreated(payload: TaskCommentCreatedSignal) {
    handleInvalidateQueries([
      { queryKey: ['comments', payload.task.id], exact: false },
    ]);
    handleInvalidateUnreadNotifications();
  }

  function sinalizeTaskAuditLog(payload: TaskAuditLogSignal) {
    const { action } = payload;

    if (action === 'CREATE') {
      handleInvalidateQueries([{ queryKey: ['task-creation-audit-logs'] }]);
    } else if (action === 'UPDATE') {
      handleInvalidateQueries([{ queryKey: ['task-update-audit-logs'] }]);
    } else if (action === 'DELETE') {
      handleInvalidateQueries([{ queryKey: ['task-deletion-audit-logs'] }]);
    }

    handleInvalidateUnreadNotifications();
  }

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
