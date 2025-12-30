import { useEffect } from 'react';
import { useListUsersQuery } from '@/app/hooks/queries/use-list-users-query';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTaskController } from '@/view/pages/task/use-task-controller';
import { useUpdateTaskMutation } from '@/app/hooks/mutations/use-update-task-mutation';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListUsersByTaskIdQuery } from '@/app/hooks/queries/use-list-users-by-task-id-query';

import { AxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTaskSchema } from '@/app/schemas/update-task-schema';

import { toast } from '@/app/utils/toast';
import {
  invalidateQueries,
  type InvalidateQuery,
} from '@/app/utils/invalidate-queries';

import { optionsTaskPriority, optionsTaskStatus } from '@/config/options';

import type { UpdateTaskData } from '@/types/task-data';
import type { Task } from '@/app/entities/task';

export function useUpdateTaskSheetController(taskData: Task | undefined) {
  const { isUpdateTaskSheetOpen, handleCloseUpdateTaskSheet } = useTasks();

  function parseDate(term?: string): Date | undefined {
    if (!term) return;
    const [d, m, y] = term.split('/').map(Number);
    return new Date(y, m - 1, d);
  }

  const id = taskData?.id!;
  const title = taskData?.title;
  const description = taskData?.description;
  const term = parseDate(taskData?.term);
  const priority = taskData?.priority.value;
  const status = taskData?.status.value;

  const {
    control,
    reset,
    register,
    handleSubmit: reactHookHandleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskData>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      title,
      description,
      term,
      priority,
      status,
    },
  });

  const queryClient = useQueryClient();

  const { currentPage } = useTaskController();

  const { updateTask, isUpdateTaskLoading } = useUpdateTaskMutation();
  const { users, isUsersLoading } = useListUsersQuery();

  const { participants } = useListUsersByTaskIdQuery({ taskId: id });

  const participantIds = participants?.map((participant) => participant.id);

  function handleInvalidateQueries(invalidateQuery: InvalidateQuery[]) {
    invalidateQueries({
      queryClient,
      invalidateQuery,
    });
  }

  const handleSubmit = reactHookHandleSubmit(
    async (data: Omit<UpdateTaskData, 'lastEditedBy'>) => {
      try {
        await updateTask({ taskId: id, data });

        reset();

        handleInvalidateQueries([
          { queryKey: ['tasks', currentPage], exact: false },
          { queryKey: ['task', id] },
          { queryKey: ['users-tasks', id] },
          { queryKey: ['task-update-audit-logs'] },
        ]);

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
        title,
        description,
        term,
        priority,
        status,
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
