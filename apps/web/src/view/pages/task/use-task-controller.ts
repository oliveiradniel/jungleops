import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useGetTaskQuery } from '@/app/hooks/queries/use-get-task-query';
import { useListCommentsQuery } from '@/app/hooks/queries/use-list-comments-query';
import { useCreateCommentMutation } from '@/app/hooks/mutations/use-create-comment-mutation';
import { useAuth } from '@/app/hooks/use-auth';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListUsersByTaskIdQuery } from '@/app/hooks/queries/use-list-users-by-task-id-query';

import { toast } from '@/app/utils/toast';
import { invalidateQueries } from '@/app/utils/invalidate-queries';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCommentWithoutUserIdSchema } from '@/app/schemas/create-comment-schema';

import type { CreateCommentWithoutUserIdData } from '@/types/comment-data';

export function useTaskController() {
  const { taskId } = useParams({
    from: '/_authenticated/_layout/tasks_/$taskId',
  });
  const { page, size } = useSearch({
    from: '/_authenticated/_layout/tasks_/$taskId',
  });

  const { navigate } = useRouter();

  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { handleOpenUpdateTaskSheet, handleOpenDeleteTaskDialog } = useTasks();

  const { task, isTaskLoading, isTasksFetching, hasError } =
    useGetTaskQuery(taskId);
  const { createComment, isCreateCommentLoading } = useCreateCommentMutation();

  const { participants, isParticipantsLoading } = useListUsersByTaskIdQuery({
    taskId,
  });

  const {
    commentsList,
    totalCommentsCount,
    totalPages,
    hasNext,
    hasPrevious,
    isCommentsLoading,
  } = useListCommentsQuery({
    taskId,
    page,
    size,
  });

  const maxVisiblePages = 3;
  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages!, startPage + maxVisiblePages - 1);

  const pagesToShow: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const currentPage = page;

  const {
    reset,
    register,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<CreateCommentWithoutUserIdData>({
    resolver: zodResolver(CreateCommentWithoutUserIdSchema),
  });

  const handleSubmitCreateComment = hookFormHandleSubmit(
    async (data: CreateCommentWithoutUserIdData) => {
      try {
        await createComment({
          taskId,
          data: { userId: user?.id!, comment: data.comment },
        });

        reset();

        invalidateQueries({
          queryClient,
          invalidateQuery: [{ queryKey: ['comments', taskId], exact: false }],
        });

        toast({
          type: 'success',
          description: 'Comentário adicionado com sucesso.',
        });
      } catch {
        toast({
          type: 'error',
          description: 'Houve um erro ao enviar o comentário.',
        });
      }
    },
  );

  function handlePageNavigation(page: number) {
    navigate({
      to: '/tasks/$taskId',
      params: { taskId },
      search: (old) => ({ ...old, page }),
    });
  }

  function handleSizePerPage(size: number) {
    navigate({
      to: '/tasks/$taskId',
      params: { taskId },
      search: (old) => ({ ...old, size, page: 1 }),
    });
  }

  useEffect(() => {
    if (hasError) {
      navigate({ to: '/tasks' });

      toast({
        type: 'error',
        description: 'Houve um erro ao encontrar a tarefa.',
      });
    }
  }, [hasError]);

  return {
    task,
    commentsList,
    participants,
    isParticipantsLoading,
    totalCommentsCount,
    hasNext,
    hasPrevious,
    isCommentsLoading,
    isTaskLoading,
    isTasksFetching,
    currentPage,
    totalPages,
    page,
    size,
    isCreateCommentLoading,
    handleOpenUpdateTaskSheet,
    handleOpenDeleteTaskDialog,
    register,
    handleSubmitCreateComment,
    handlePageNavigation,
    handleSizePerPage,
  };
}
