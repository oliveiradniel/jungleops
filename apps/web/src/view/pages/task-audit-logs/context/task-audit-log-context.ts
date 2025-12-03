import { createContext } from 'react';

interface TaskAuditLogContextValues {
  isDeleteTaskDialogOpen: boolean;
  handleOpenDeleteTaskDialog: (params: {
    selectedLogId: string;
    type: 'creation' | 'update' | 'deletion';
  }) => void;
  handleCloseDeleteTaskDialog: () => void;
}

export const TaskAuditLogContext = createContext(
  {} as TaskAuditLogContextValues,
);
