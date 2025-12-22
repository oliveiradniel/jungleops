import { useQuery } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

import type { TaskFilters } from '@challenge/shared';

export function useListTasksQuery({
  page,
  size,
  orderBy,
  order,
  status,
  priority,
}: TaskFilters) {
  const tasksService = makeTasksService();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tasks', page, size, orderBy, order, status, priority],
    queryFn: () =>
      tasksService.list({ page, size, orderBy, order, status, priority }),
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
