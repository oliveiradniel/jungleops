import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useTasks } from '@/app/hooks/use-tasks';
import { useDeleteTaskMutation } from '@/app/hooks/mutations/use-delete-task-mutation';

import { AxiosError } from 'axios';

import { toast } from '@/app/utils/toast';
import {
  invalidateQueries,
  type InvalidateQuery,
} from '@/app/utils/invalidate-queries';

interface UseDeleteTaskDialogProps {
  taskId: string;
  title: string;
  page: number;
  onClosePopover?: () => void;
}

export function useDeleteTaskDialog({
  taskId,
  title,
  page,
  onClosePopover,
}: UseDeleteTaskDialogProps) {
  const router = useRouter();

  const { isDeleteTaskDialogOpen, handleCloseDeleteTaskDialog } = useTasks();

  const queryClient = useQueryClient();

  const { deleteTask, isDeleteTaskLoading } = useDeleteTaskMutation();

  const [titleConfirmation, setTitleConfirmation] = useState('');

  const buttonDeleteTaskDisabled = titleConfirmation !== title;

  function handleInvalidateQueries(invalidateQuery: InvalidateQuery[]) {
    invalidateQueries({
      queryClient,
      invalidateQuery,
    });
  }

  function handleChangeTitleConfirmation(event: ChangeEvent<HTMLInputElement>) {
    setTitleConfirmation(event.target.value);
  }

  async function handleDeleteTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await deleteTask(taskId);

      onClosePopover?.();
      handleCloseDeleteTaskDialog();

      handleInvalidateQueries([
        { queryKey: ['tasks', page], exact: false },
        { queryKey: ['task-deletion-audit-logs'] },
      ]);

      toast({
        type: 'successful-delete',
        description: `A tarefa "${title}" foi excluída com sucesso.`,
      });

      setTitleConfirmation('');

      router.navigate({ to: '/tasks' });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Task not found.') {
          handleInvalidateQueries([
            { queryKey: ['tasks', page], exact: false },
          ]);

          onClosePopover?.();
        }
      }

      toast({
        type: 'error',
        description: `Houve um erro ao excluir a tarefa ${title}.`,
      });
    }
  }

  return {
    isDeleteTaskDialogOpen,
    isDeleteTaskLoading,
    buttonDeleteTaskDisabled,
    titleConfirmation,
    handleCloseDeleteTaskDialog,
    handleChangeTitleConfirmation,
    handleDeleteTask,
  };
}
