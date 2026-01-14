import { useMemo } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListTasksQuery } from '@/app/hooks/queries/use-list-tasks-query';

import { taskColumns } from './task-columns';

export function useTasksController() {
  const { handleOpenNewTaskSheet } = useTasks();

  const navigate = useNavigate();

  const { page, size, orderBy, order, status, priority, q } = useSearch({
    from: '/_authenticated/_layout/tarefas',
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

  function handlePageNavigation(page: number) {
    navigate({ to: '/tarefas', search: (old) => ({ ...old, page }) });
  }

  function handleSizePerPage(size: number) {
    navigate({ to: '/tarefas', search: (old) => ({ ...old, size, page: 1 }) });
  }

  return {
    tasks,
    table,
    totalAll,
    totalFiltered,
    pagination,
    facets,
    page,
    size,
    isTasksLoading,
    isTasksFetching,
    handleOpenNewTaskSheet,
    handlePageNavigation,
    handleSizePerPage,
  };
}
