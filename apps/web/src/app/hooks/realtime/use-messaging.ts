import type { QueryClient } from '@tanstack/react-query';

import { toast } from '@/app/utils/toast';

import type {
  TaskAssignedNotification,
  TaskAuditLogSignal,
  TaskCommentCreatedNotification,
  TaskDeletedNotification,
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
  function onTaskCreated() {
    toast({
      type: 'info',
      description: 'Uma nova tarefa foi adicionada.',
    });

    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskTitleUpdated(payload: TaskTitleUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o título alterado.',
    });

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: payload.task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskStatusUpdated(payload: TaskStatusUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o status alterado.',
    });

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: payload.task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskPriorityUpdated(payload: TaskPriorityUpdatedNotification) {
    toast({
      type: 'info',
      description:
        'Uma tarefa da qual você participa teve a prioriedade alterada.',
    });

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: payload.task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskTermUpdated(payload: TaskTermUpdatedNotification) {
    toast({
      type: 'info',
      description: 'Uma tarefa da qual você participa teve o prazo alterado.',
    });

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: payload.task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskAssigned(payload: TaskAssignedNotification) {
    const { task } = payload;

    if (task.addedParticipantIds.includes(userId!)) {
      toast({
        type: 'info',
        description: 'Você foi atribuido à uma tarefa',
      });
    }

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: task.id }],
    });
  }

  function onTaskUnassigned(payload: TaskUnassignedNotification) {
    const { task } = payload;

    if (task.removedParticipantIds.includes(userId!)) {
      toast({
        type: 'info',
        description: 'Você foi removido de uma tarefa.',
      });
    }

    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: task.id }],
    });
  }

  function onTaskDeleted(payload: TaskDeletedNotification) {
    const { task } = payload;

    if (task.participantIds.includes(userId!)) {
      toast({
        type: 'info',
        description: 'Uma tarefa da qual você participava foi excluída.',
      });
    }

    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function onTaskCommentCreated(payload: TaskCommentCreatedNotification) {
    const { task } = payload;

    if (task.participantIds.includes(userId!)) {
      toast({
        type: 'info',
        description:
          'Uma tarefa da qual você participa tem um novo comentário.',
      });
    }

    queryClient.invalidateQueries({
      queryKey: ['comments', { taskId: task.id }],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function sinalizeTaskUpdated(payload: TaskUpdatedSignal) {
    queryClient.invalidateQueries({
      queryKey: ['task', { taskId: payload.task.id }],
    });
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
      exact: false,
    });
  }

  function sinalizeTaskAuditLog(payload: TaskAuditLogSignal) {
    const actionLabels = {
      CREATE: 'creation',
      UPDATE: 'update',
      DELETE: 'deletion',
    };

    const actionLabel = actionLabels[payload.action];

    queryClient.invalidateQueries({
      queryKey: [`task-${actionLabel}-audit-logs`],
    });
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
    sinalizeTaskAuditLog,
  };
}
