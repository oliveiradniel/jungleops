import { useQuery } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

export interface UseListsTasksQueryParams {
  page: number;
  size: number;
  status?: string;
  priority?: string;
}

export function useListTasksQuery({
  page,
  size,
  status,
  priority,
}: UseListsTasksQueryParams) {
  const tasksService = makeTasksService();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tasks', page, size, status, priority],
    queryFn: () => tasksService.list({ page, size, status, priority }),
    placeholderData: (previousData) => previousData,
  });

  return {
    tasks: data?.tasks ?? [],
    total: data?.total ?? 0,
    pagination: data?.pagination,
    facets: data?.facets,
    isTasksLoading: isLoading,
    isTasksFetching: isFetching,
  };
}
