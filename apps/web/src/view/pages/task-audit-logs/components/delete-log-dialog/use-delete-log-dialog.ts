import { useQueryClient } from '@tanstack/react-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';
import { useDeleteTaskAuditLogMutation } from '@/app/hooks/mutations/use-delete-task-audit-log-mutation';

import { toast } from '@/app/utils/toast';
import {
  invalidateQueries,
  type InvalidateQuery,
} from '@/app/utils/invalidate-queries';

export interface DeleteLogDialogProps {
  selectedLogId: string;
  type: 'creation' | 'update' | 'deletion';
}

export function useDeleteLogDialog({
  selectedLogId,
  type,
}: DeleteLogDialogProps) {
  const queryClient = useQueryClient();

  const {
    isDeleteTaskAuditLogDialogOpen,
    handleOpenDeleteTaskAuditLogDialog,
    handleCloseDeleteTaskAuditLogDialog,
  } = useTaskAuditLog();

  const { deleteTaskAuditLog, isDeleteTaskAuditLogLoading } =
    useDeleteTaskAuditLogMutation();

  function handleInvalidateQueries(invalidateQuery: InvalidateQuery[]) {
    invalidateQueries({
      queryClient,
      invalidateQuery,
    });
  }

  async function handleDeleteLog() {
    try {
      await deleteTaskAuditLog(selectedLogId);

      if (type === 'creation') {
        handleInvalidateQueries([{ queryKey: ['task-creation-audit-logs'] }]);
      } else if (type === 'update') {
        handleInvalidateQueries([{ queryKey: ['task-update-audit-logs'] }]);
      } else if (type === 'deletion') {
        handleInvalidateQueries([{ queryKey: ['task-deletion-audit-logs'] }]);
      }

      queryClient.invalidateQueries({
        queryKey: [`task-${type}-audit-logs`],
      });

      toast({
        type: 'successful-delete',
        description: `O audit log foi excluído com sucesso.`,
      });

      handleCloseDeleteTaskAuditLogDialog();
    } catch {
      toast({
        type: 'error',
        description: `Houve um erro ao excluir o audit log.`,
      });
    }
  }

  return {
    handleDeleteLog,
    handleOpenDeleteTaskAuditLogDialog,
    handleCloseDeleteTaskAuditLogDialog,
    isDeleteTaskAuditLogLoading,
    isDeleteTaskAuditLogDialogOpen,
  };
}
