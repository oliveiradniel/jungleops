import { createContext } from 'react';

import type { CheckedState } from '@radix-ui/react-checkbox';
import type { TaskPriority } from '../enums/TaskPriority';
import type { TaskStatus } from '../enums/TaskStatus';
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
  selectedPriority: TaskPriority[];
  selectedStatus: TaskStatus[];
  togglePriorityFilter: (isChecked: CheckedState, value: TaskPriority) => void;
  toggleStatusFilter: (isChecked: CheckedState, value: TaskStatus) => void;
  taskToDelete: Pick<Task, 'id' | 'title' | 'createdAt' | 'status'> | null;
  pageForDelete: number | null;
}

export const TasksContext = createContext({} as TasksContextValue);
