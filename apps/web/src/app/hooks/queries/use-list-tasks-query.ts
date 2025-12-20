import { useQuery } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

export interface UseListsTasksQueryParams {
  page: number;
  size: number;
}

export function useListTasksQuery({ page, size }: UseListsTasksQueryParams) {
  const tasksService = makeTasksService();

  const { data, isLoading, isPending } = useQuery({
    queryKey: ['tasks', { page, size }],
    queryFn: () => tasksService.list({ page, size }),
  });

  return {
    tasksList: data?.tasks ?? [],
    totalTasksCount: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    hasNext: data?.hasNext ?? false,
    hasPrevious: data?.hasPrevious ?? false,
    isTasksLoading: isLoading,
    isTasksPending: isPending,
  };
}
