import { useState } from 'react';

import { TasksContext } from '../contexts/tasks-context';

import type { Task } from '../entities/task';

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const [isUpdateTaskSheetOpen, setIsUpdateTaskSheetOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState<Pick<
    Task,
    'id' | 'title' | 'createdAt' | 'status'
  > | null>(null);
  const [pageForDelete, setPageForDelete] = useState<number | null>(null);

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
        taskToDelete,
        pageForDelete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
