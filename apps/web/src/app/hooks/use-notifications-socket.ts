import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { env } from '@/config/env';
import { io, Socket } from 'socket.io-client';
import { toast } from '../utils/toast';
import { priorityLabels, statusLabels } from '@/config/labels';

import type {
  ActionPayload,
  AssignedToTaskNotificationPayload,
  DeletedTaskNotificationPayload,
  NewCommentNotificationPayload,
  Task,
  UpdatedTaskNotificationPayload,
  UpdatedTaskPriorityNotificationPayload,
  UpdatedTaskStatusNotificationPayload,
} from '@challenge/shared';
import type { TaskPriority } from '../enums/TaskPriority';
import type { TaskStatus } from '../enums/TaskStatus';

export function useNotificationsSocket({
  userId,
  taskId,
}: {
  userId?: string;
  taskId?: string;
}) {
  const socketRef = useRef<Socket | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const socket = io(env.NOTIFICATIONS_SERVICE_BASE_URL, {
      auth: { userId },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('task:created', (data: Task) => {
      toast({
        type: 'info',
        description: `A tarefa "${data.title}" foi adicionada, A prioridade dela é ${priorityLabels[data.priority as TaskPriority].toLowerCase()}.`,
      });

      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: false,
      });
    });

    socket.on('task:updated', (data: UpdatedTaskNotificationPayload) => {
      if (data.participantIds.includes(userId)) {
        toast({
          type: 'info',
          description: `A tarefa "${data.fullTask.title}" foi atualizada.`,
        });

        return;
      }

      queryClient.invalidateQueries({
        queryKey: ['task', { taskId }],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: false,
      });
    });

    socket.on('task:status', (data: UpdatedTaskStatusNotificationPayload) => {
      if (data.participantIds.includes(userId)) {
        toast({
          type: 'info',
          description: `O status da tarefa "${data.title}" foi alterado para "${statusLabels[data.status as TaskStatus].toLowerCase()}".`,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['task', { taskId }],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: false,
      });
    });

    socket.on(
      'task:priority',
      (data: UpdatedTaskPriorityNotificationPayload) => {
        if (data.participantIds.includes(userId)) {
          toast({
            type: 'info',
            description: `A prioridade da tarefa "${data.title}" foi alterado para "${priorityLabels[data.priority as TaskPriority].toLowerCase()}".`,
          });
        }

        queryClient.invalidateQueries({
          queryKey: ['task', { taskId }],
        });
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
          exact: false,
        });
      },
    );

    socket.on('task:assigned', (data: AssignedToTaskNotificationPayload) => {
      if (data.newUserIds.includes(userId)) {
        toast({
          type: 'info',
          description: `Você foi atribuído à tarefa "${data.fullTask.title}". A prioridade dela é ${priorityLabels[data.fullTask.priority as TaskPriority].toLowerCase()}.`,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['task', { taskId }],
      });
    });

    socket.on('task:deleted', (data: DeletedTaskNotificationPayload) => {
      toast({
        type: 'successful-delete',
        description: `A tarefa "${data.title}" foi excluída.`,
      });

      queryClient.invalidateQueries({
        queryKey: ['task', { taskId }],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: false,
      });
    });

    socket.on('comment:new', (data: NewCommentNotificationPayload) => {
      if (data.participantIds.includes(userId)) {
        toast({
          type: 'info',
          description: `Novo comentário em "${data.taskTitle}": ${data.comment.text}`,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['task'],
      });
    });

    socket.on('task-audit-log:changed', ({ action }: ActionPayload) => {
      const actionLabels = {
        CREATE: 'creation',
        UPDATE: 'update',
        DELETE: 'deletion',
      };

      const actionLabel = actionLabels[action];

      queryClient.invalidateQueries({
        queryKey: [`task-${actionLabel}-audit-logs`],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const updateList = () => {
    socketRef.current?.emit('tasks:list-update');
  };

  return {
    updateList,
  };
}
