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
  search,
}: TaskFilters) {
  const tasksService = makeTasksService();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tasks', page, size, orderBy, order, status, priority, search],
    queryFn: () =>
      tasksService.list({
        page,
        size,
        orderBy,
        order,
        status,
        priority,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });

  return {
    tasks: data?.tasks ?? [],
    totalAll: data?.totalAll ?? 0,
    totalFiltered: data?.totalFiltered ?? 0,
    pagination: data?.pagination,
    facets: data?.facets,
    isTasksLoading: isLoading,
    isTasksFetching: isFetching,
  };
}
