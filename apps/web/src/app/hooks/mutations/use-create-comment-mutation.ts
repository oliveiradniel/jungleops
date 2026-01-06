import { useMutation } from '@tanstack/react-query';

import { makeCommentsService } from '@/app/factories/make-comments-service';

import type { CreateCommentData } from '@/types/comment-data';

export function useCreateCommentMutation() {
  const commentsService = makeCommentsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: CreateCommentData;
    }) => commentsService.create(taskId, data),
  });

  return {
    createComment: mutateAsync,
    isCreateCommentLoading: isPending,
  };
}
