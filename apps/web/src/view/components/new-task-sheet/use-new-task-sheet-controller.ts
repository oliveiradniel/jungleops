import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '@/app/hooks/mutations/use-create-task-mutation';
import { useTasksController } from '@/view/pages/tasks/use-tasks-controller';
import { useTasks } from '@/app/hooks/use-tasks';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskSchema } from '@/app/schemas/create-task-schema';

import { optionsTaskPriority, optionsTaskStatus } from '@/config/options';

import { toast } from '@/app/utils/toast';
import { AxiosError } from 'axios';

import type { CreateTaskData } from '@/types/task-data';

export function useNewTaskSheetController() {
  const { isNewTaskSheetOpen, handleCloseNewTaskSheet } = useTasks();

  const {
    control,
    reset,
    register,
    handleSubmit: reactHookHandleSubmit,
    formState: { errors },
  } = useForm<CreateTaskData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      priority: 'LOW',
      status: 'TODO',
    },
  });

  const queryClient = useQueryClient();

  const { page } = useTasksController();

  const { createTask, isCreateTaskLoading } = useCreateTaskMutation();

  const handleSubmit = reactHookHandleSubmit(async (data: CreateTaskData) => {
    try {
      await createTask(data);

      reset();

      queryClient.invalidateQueries({
        queryKey: ['tasks', { page }],
      });
      queryClient.invalidateQueries({
        queryKey: ['task-creation-audit-logs'],
      });

      toast({
        type: 'success',
        description: 'Tarefa criada com sucesso.',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Title is already in use.')
          toast({
            type: 'error',
            description: 'Este título já está em uso!',
          });

        queryClient.invalidateQueries({
          queryKey: ['tasks', { page }],
        });
        queryClient.invalidateQueries({
          queryKey: ['task'],
          exact: false,
        });

        return;
      }

      toast({
        type: 'error',
        description: 'Houve um erro ao criar a tarefa!',
      });
    }
  });

  const titleErrorMessage = errors.title?.message;
  const descriptionErrorMessage = errors.description?.message;
  const termErrorMessage = errors.term?.message;
  const priorityErrorMessage = errors.priority?.message;
  const statusErrorMessage = errors.status?.message;
  const isFormInvalid =
    !!titleErrorMessage ||
    !!descriptionErrorMessage ||
    !!termErrorMessage ||
    !!priorityErrorMessage ||
    !!statusErrorMessage;

  return {
    control,
    register,
    handleSubmit,
    optionsTaskPriority,
    optionsTaskStatus,
    titleErrorMessage,
    descriptionErrorMessage,
    termErrorMessage,
    priorityErrorMessage,
    statusErrorMessage,
    isFormInvalid,
    isNewTaskSheetOpen,
    isCreateTaskLoading,
    handleCloseNewTaskSheet,
  };
}
