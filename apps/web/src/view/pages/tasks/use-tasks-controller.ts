import { useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListTasksQuery } from '@/app/hooks/queries/use-list-tasks-query';

import { taskColumns } from './task-columns';

export function useTasksController() {
  const { handleOpenNewTaskSheet } = useTasks();

  const { page, size, orderBy, order, status, priority, q } = useSearch({
    from: '/_authenticated/tasks',
  });

  const {
    tasks,
    totalAll,
    totalFiltered,
    pagination,
    facets,
    isTasksLoading,
    isTasksFetching,
  } = useListTasksQuery({
    page,
    size,
    orderBy,
    order,
    status,
    priority,
    search: q,
  });

  const paginationTST = useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: size,
    }),
    [page, size],
  );

  const table = useReactTable({
    data: tasks,
    columns: taskColumns,
    state: {
      pagination: paginationTST,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    totalAll,
    totalFiltered,
    pagination,
    facets,
    isTasksLoading,
    isTasksFetching,
    handleOpenNewTaskSheet,
  };
}
