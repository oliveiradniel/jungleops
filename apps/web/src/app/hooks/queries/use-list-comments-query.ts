import { useQuery } from '@tanstack/react-query';

import { makeCommentsService } from '@/app/factories/make-comments-service';
import type { CommentWithUserData } from '@challenge/shared';

export interface UseCommentsTasksQueryParams {
  taskId: string;
  page: number;
  size: number;
}

export function useListCommentsQuery({
  taskId,
  page,
  size,
}: UseCommentsTasksQueryParams) {
  const commentsService = makeCommentsService();

  const { data, isPending } = useQuery({
    queryKey: ['comments', taskId, page],
    queryFn: () => commentsService.list(taskId, { page, size }),
  });

  return {
    commentsList: data?.comments ?? ([] as CommentWithUserData[]),
    totalCommentsCount: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    hasNext: data?.hasNext ?? false,
    hasPrevious: data?.hasPrevious ?? false,
    isCommentsLoading: isPending,
  };
}
