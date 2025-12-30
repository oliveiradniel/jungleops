import type { QueryClient } from '@tanstack/react-query';

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

export function useMessaging({
  userId,
  queryClient,
}: {
  userId?: string;
  queryClient: QueryClient;
}) {
  function handleInvalidateQueries(invalidateQuery: InvalidateQuery[]) {
    invalidateQueries({
      queryClient,
      invalidateQuery,
    });
  }

  function onTaskCreated() {
    toast({
      type: 'info',
      description: 'Uma nova tarefa foi adicionada.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
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
  }

  function onTaskDeleted() {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participava foi excluída.',
    });

    handleInvalidateQueries([{ queryKey: ['tasks'], exact: false }]);
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
  }

  function sinalizeTaskUpdated(payload: TaskUpdatedSignal) {
    const taskId = payload.task.id;

    handleInvalidateQueries([
      { queryKey: ['users-tasks', taskId] },
      { queryKey: ['task', taskId] },
      { queryKey: ['tasks'], exact: false },
    ]);
  }

  function sinalizeTaskCommentCreated(payload: TaskCommentCreatedSignal) {
    handleInvalidateQueries([
      { queryKey: ['comments', payload.task.id], exact: false },
    ]);
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
