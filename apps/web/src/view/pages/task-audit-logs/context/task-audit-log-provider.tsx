import { useState } from 'react';

import { TaskAuditLogContext } from './task-audit-log-context';
import { DeleteLogDialog } from '../delete-log-dialog';

export function TaskAuditLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [logType, setLogType] = useState<
    'creation' | 'update' | 'deletion' | null
  >(null);

  function handleOpenDeleteTaskDialog({
    selectedLogId,
    type,
  }: {
    selectedLogId: string;
    type: 'creation' | 'update' | 'deletion';
  }) {
    setSelectedLogId(selectedLogId);
    setIsDeleteTaskDialogOpen(true);
    setLogType(type);
  }

  function handleCloseDeleteTaskDialog() {
    setIsDeleteTaskDialogOpen(false);
  }

  return (
    <TaskAuditLogContext.Provider
      value={{
        isDeleteTaskDialogOpen,
        handleOpenDeleteTaskDialog,
        handleCloseDeleteTaskDialog,
      }}
    >
      <>
        {children}

        <DeleteLogDialog selectedLogId={selectedLogId!} type={logType!} />
      </>
    </TaskAuditLogContext.Provider>
  );
}
