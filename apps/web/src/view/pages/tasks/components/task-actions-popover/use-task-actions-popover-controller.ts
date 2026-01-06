import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateCommentMutation } from '@/app/hooks/mutations/use-create-comment-mutation';
import { useAuth } from '@/app/hooks/use-auth';
import { useTasks } from '@/app/hooks/use-tasks';
import { useTasksController } from '../../use-tasks-controller';

import { toast } from '@/app/utils/toast';

import type { ListTasksPagination } from '@challenge/shared';

export function useTaskActionsPopoverController({
  title,
  taskId,
}: {
  title: string;
  taskId: string;
}) {
  const queryClient = useQueryClient();

  const { createComment, isCreateCommentLoading } = useCreateCommentMutation();

  const { user } = useAuth();
  const { handleOpenDeleteTaskDialog } = useTasks();
  const { page } = useTasksController();

  const [comment, setComment] = useState('');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNewCommentDialogOpen, setIsNewCommentDialogOpen] = useState(false);

  async function handleCreateComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      await createComment({ taskId, data: { userId: user?.id!, comment } });

      setIsPopoverOpen(false);
      setIsNewCommentDialogOpen(false);
      setComment('');

      queryClient.setQueryData<ListTasksPagination | undefined>(
        ['tasks', { page }],
        (oldData): ListTasksPagination | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            tasks: oldData.tasks.map((task) => {
              return task.id === taskId
                ? {
                    ...task,
                    commentsCount: (task.commentsCount || 0) + 1,
                    comment,
                  }
                : task;
            }),
          };
        },
      );

      toast({
        type: 'success',
        description: `Comentário adicionado com sucesso à tarefa "${title}".`,
      });
    } catch {
      toast({
        type: 'success',
        description: 'Houve um erro ao adicionar o comentário.',
      });
    }
  }

  return {
    isPopoverOpen,
    isNewCommentDialogOpen,
    comment,
    currentPage: page,
    setIsPopoverOpen,
    setIsNewCommentDialogOpen,
    setComment,
    handleCreateComment,
    handleOpenDeleteTaskDialog,
    isCreateCommentLoading,
  };
}
