import { useState } from 'react';

import { TasksContext } from '../contexts/tasks-context';

import type { Task } from '../entities/task';
import type { TaskStatus } from '../enums/TaskStatus';
import type { CheckedState } from '@radix-ui/react-checkbox';
import type { TaskPriority } from '../enums/TaskPriority';

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const [isUpdateTaskSheetOpen, setIsUpdateTaskSheetOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);

  const [selectedPriority, setSelectedPriority] = useState<TaskPriority[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<Pick<
    Task,
    'id' | 'title' | 'createdAt' | 'status'
  > | null>(null);
  const [pageForDelete, setPageForDelete] = useState<number | null>(null);

  function togglePriorityFilter(isChecked: CheckedState, value: TaskPriority) {
    setSelectedPriority((prev) =>
      isChecked ? [...prev, value] : prev.filter((p) => p !== value),
    );
  }

  function toggleStatusFilter(isChecked: CheckedState, value: TaskStatus) {
    setSelectedStatus((prev) =>
      isChecked ? [...prev, value] : prev.filter((s) => s !== value),
    );
  }

  function handleOpenDeleteTaskDialog(
    task: Pick<Task, 'id' | 'title' | 'createdAt' | 'status'>,
    page: number,
  ) {
    setIsDeleteTaskDialogOpen(true);
    setTaskToDelete(task);
    setPageForDelete(page);
  }

  return (
    <TasksContext.Provider
      value={{
        isNewTaskSheetOpen,
        isUpdateTaskSheetOpen,
        isDeleteTaskDialogOpen,
        handleOpenNewTaskSheet: () => setIsNewTaskSheetOpen(true),
        handleOpenUpdateTaskSheet: () => setIsUpdateTaskSheetOpen(true),
        handleOpenDeleteTaskDialog,
        handleCloseNewTaskSheet: () => setIsNewTaskSheetOpen(false),
        handleCloseUpdateTaskSheet: () => setIsUpdateTaskSheetOpen(false),
        handleCloseDeleteTaskDialog: () => setIsDeleteTaskDialogOpen(false),
        selectedPriority,
        selectedStatus,
        togglePriorityFilter,
        toggleStatusFilter,
        taskToDelete,
        pageForDelete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
