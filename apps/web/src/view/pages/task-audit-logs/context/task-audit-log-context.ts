import { createContext } from 'react';

interface TaskAuditLogContextValues {
  isDeleteTaskAuditLogDialogOpen: boolean;
  handleOpenDeleteTaskAuditLogDialog: (params: {
    selectedLogId: string;
    type: 'creation' | 'update' | 'deletion';
  }) => void;
  handleCloseDeleteTaskAuditLogDialog: () => void;
}

export const TaskAuditLogContext = createContext(
  {} as TaskAuditLogContextValues,
);
