import { useMemo, useState } from 'react';
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
import { usePagination } from '@/app/hooks/use-pagination';
import { useNotificationsSocket } from '@/app/hooks/use-notifications-socket';

import { taskColumns } from './task-columns';

export interface FilterParams {
  type: 'priority' | 'status';
  value: string;
}

export function useTasksController() {
  const { selectedPriority, selectedStatus, handleOpenNewTaskSheet } =
    useTasks();

  const { page, size, goToPage, handlePreviousTasksPage, handleNextTasksPage } =
    usePagination({ from: '/_authenticated/tasks', to: '/tasks' });

  const { user } = useAuth();

  useNotificationsSocket({ userId: user?.id });

  const {
    tasksList,
    totalTasksCount,
    totalPages,
    hasNext,
    hasPrevious,
    isTasksLoading,
    isTasksPending,
  } = useListTasksQuery({ page, size });

  const table = useReactTable({
    data: tasksList,
    columns: taskColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  const maxVisiblePages = 3;

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages!, startPage + maxVisiblePages - 1);

  const pagesToShow: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const [searchInput, setSearchInput] = useState('');

  const filteredTasksList = useMemo(() => {
    if (!tasksList.length) return [];

    return tasksList.filter((task) => {
      const matchesSearch =
        !searchInput ||
        task.title.toLowerCase().includes(searchInput.toLowerCase());

      const matchesPriority =
        selectedPriority.length === 0 ||
        selectedPriority.includes(task.priority);

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(task.status);

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [searchInput, tasksList, selectedPriority, selectedStatus]);

  function handleChangeSearchInput(value: string) {
    setSearchInput(value);
  }

  return {
    table,
    filteredTasksList,
    totalTasksCount,
    isTasksLoading,
    isTasksPending,
    hasPrevious: hasPrevious!,
    hasNext: hasNext!,
    startPage,
    endPage,
    pagesToShow,
    page,
    totalPages: totalPages!,
    searchInput,
    goToPage,
    handlePreviousTasksPage,
    handleNextTasksPage,
    handleOpenNewTaskSheet,
    handleChangeSearchInput,
  };
}
