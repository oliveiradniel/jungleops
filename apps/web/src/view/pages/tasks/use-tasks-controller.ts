import { useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useAuth } from '@/app/hooks/use-auth';
import { useTasks } from '@/app/hooks/use-tasks';
import { useListTasksQuery } from '@/app/hooks/queries/use-list-tasks-query';
import { useNotificationsSocket } from '@/app/hooks/use-notifications-socket';

import { taskColumns } from './task-columns';

export function useTasksController() {
  const { handleOpenNewTaskSheet } = useTasks();

  const { user } = useAuth();

  useNotificationsSocket({ userId: user?.id });

  const { page, size } = useSearch({ from: '/_authenticated/tasks' });

  const {
    tasksList,
    totalTasksCount,
    totalPages,
    hasNext,
    hasPrevious,
    isTasksLoading,
    isTasksPending,
  } = useListTasksQuery({ page, size });

  const pagination = useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: size,
    }),
    [page, size],
  );

  const table = useReactTable({
    data: tasksList,
    columns: taskColumns,
    state: {
      pagination,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  return {
    table,
    totalTasksCount,
    isTasksLoading,
    isTasksPending,
    hasPrevious: hasPrevious!,
    hasNext: hasNext!,
    page,
    totalPages: totalPages!,
    handleOpenNewTaskSheet,
  };
}
