import { createContext } from 'react';

import type { Task } from '../entities/task';

export interface TasksContextValue {
  isNewTaskSheetOpen: boolean;
  isUpdateTaskSheetOpen: boolean;
  isDeleteTaskDialogOpen: boolean;
  handleOpenNewTaskSheet: () => void;
  handleCloseNewTaskSheet: () => void;
  handleOpenUpdateTaskSheet: () => void;
  handleCloseUpdateTaskSheet: () => void;
  handleOpenDeleteTaskDialog: (
    task: Pick<Task, 'id' | 'title' | 'createdAt' | 'status'>,
    page: number,
  ) => void;
  handleCloseDeleteTaskDialog: () => void;
  taskToDelete: Pick<Task, 'id' | 'title' | 'createdAt' | 'status'> | null;
  pageForDelete: number | null;
}

export const TasksContext = createContext({} as TasksContextValue);
