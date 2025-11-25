import { useEffect } from 'react';
import { useListUsersQuery } from '@/app/hooks/queries/use-list-users-query';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTaskController } from '@/view/pages/task/use-task-controller';
import { useAuth } from '@/app/hooks/use-auth';
import { useUpdateTaskMutation } from '@/app/hooks/mutations/use-update-task-mutation';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListUsersByTaskIdQuery } from '@/app/hooks/queries/use-list-users-by-task-id-query';
import { useNotificationsSocket } from '@/app/hooks/use-notifications-socket';

import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTaskSchema } from '@/app/schemas/update-task-schema';

import { toast } from '@/app/utils/toast';

import { optionsTaskPriority, optionsTaskStatus } from '@/config/options';

import type { TaskWithCommentCount, UpdateTaskData } from '@challenge/shared';
import { AxiosError } from 'axios';

export function useUpdateTaskSheetController(
  taskData: TaskWithCommentCount | undefined,
) {
  const { isUpdateTaskSheetOpen, handleCloseUpdateTaskSheet } = useTasks();

  const {
    control,
    reset,
    register,
    handleSubmit: reactHookHandleSubmit,
    formState: { errors },
  } = useForm<Omit<UpdateTaskData, 'lastEditedBy'>>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      title: taskData?.title,
      description: taskData?.description,
      term: new Date(taskData?.term!),
      priority: taskData?.priority,
      status: taskData?.status,
    },
  });

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { currentPage } = useTaskController();

  const { updateTask, isUpdateTaskLoading } = useUpdateTaskMutation();
  const { users, isUsersLoading } = useListUsersQuery();

  const { participants } = useListUsersByTaskIdQuery({ taskId: taskData?.id! });

  const participantIds = participants?.map((participant) => participant.id);

  useNotificationsSocket({ userId: user?.id, taskId: taskData?.id });

  const handleSubmit = reactHookHandleSubmit(
    async (data: Omit<UpdateTaskData, 'lastEditedBy'>) => {
      try {
        await updateTask({ taskId: taskData?.id!, data });

        reset();
        queryClient.invalidateQueries({
          queryKey: ['tasks', { page: currentPage }],
        });
        queryClient.invalidateQueries({
          queryKey: ['task', { taskId: taskData?.id }],
        });
        queryClient.invalidateQueries({
          queryKey: ['users-tasks', { taskId: taskData?.id }],
        });
        queryClient.invalidateQueries({
          queryKey: ['task-update-audit-logs', { taskId: taskData?.id }],
        });

        toast({
          type: 'success',
          description: 'Tarefa atualizada com sucesso!',
        });

        handleCloseUpdateTaskSheet();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data.message === 'Title is already in use.')
            toast({
              type: 'error',
              description: 'Este título já está em uso!',
            });

          return;
        }

        toast({
          type: 'error',
          description: 'Houve um erro ao atualizar a tarefa!',
        });
      }
    },
  );

  const titleErrorMessage = errors.title?.message;
  const descriptionErrorMessage = errors.description?.message;
  const termErrorMessage = errors.term?.message;
  const priorityErrorMessage = errors.priority?.message;
  const statusErrorMessage = errors.status?.message;
  const usersErrorMessage = errors.userIds?.message;
  const isFormInvalid =
    !!titleErrorMessage ||
    !!descriptionErrorMessage ||
    !!termErrorMessage ||
    !!priorityErrorMessage ||
    !!statusErrorMessage ||
    !!usersErrorMessage;

  useEffect(() => {
    if (taskData && isUpdateTaskSheetOpen) {
      reset({
        title: taskData.title,
        description: taskData.description,
        term: new Date(taskData.term),
        priority: taskData.priority,
        status: taskData.status,
        userIds: participantIds,
      });
    }
  }, [taskData, isUpdateTaskSheetOpen, reset]);

  return {
    control,
    register,
    handleSubmit,
    users,
    isUsersLoading,
    optionsTaskPriority,
    optionsTaskStatus,
    titleErrorMessage,
    descriptionErrorMessage,
    termErrorMessage,
    priorityErrorMessage,
    statusErrorMessage,
    usersErrorMessage,
    isFormInvalid,
    isUpdateTaskSheetOpen,
    isUpdateTaskLoading,
    handleCloseUpdateTaskSheet,
  };
}
