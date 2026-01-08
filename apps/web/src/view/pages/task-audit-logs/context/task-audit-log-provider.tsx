import { useState } from 'react';

import { TaskAuditLogContext } from './task-audit-log-context';
import { DeleteLogDialog } from '../components/delete-log-dialog';

export function TaskAuditLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDeleteTaskAuditLogDialogOpen, setIsDeleteTaskAuditLogDialogOpen] =
    useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [logType, setLogType] = useState<
    'creation' | 'update' | 'deletion' | null
  >(null);

  function handleOpenDeleteTaskAuditLogDialog({
    selectedLogId,
    type,
  }: {
    selectedLogId: string;
    type: 'creation' | 'update' | 'deletion';
  }) {
    setSelectedLogId(selectedLogId);
    setIsDeleteTaskAuditLogDialogOpen(true);
    setLogType(type);
  }

  function handleCloseDeleteTaskAuditLogDialog() {
    setIsDeleteTaskAuditLogDialogOpen(false);
  }

  return (
    <TaskAuditLogContext.Provider
      value={{
        isDeleteTaskAuditLogDialogOpen,
        handleOpenDeleteTaskAuditLogDialog,
        handleCloseDeleteTaskAuditLogDialog,
      }}
    >
      <>
        {children}

        <DeleteLogDialog selectedLogId={selectedLogId!} type={logType!} />
      </>
    </TaskAuditLogContext.Provider>
  );
}
