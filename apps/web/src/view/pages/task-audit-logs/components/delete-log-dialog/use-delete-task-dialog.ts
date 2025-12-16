import { useQueryClient } from '@tanstack/react-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';
import { useDeleteTaskAuditLogMutation } from '@/app/hooks/mutations/use-delete-task-audit-log-mutation';

import { toast } from '@/app/utils/toast';

export interface DeleteLogDialogProps {
  selectedLogId: string;
  type: 'creation' | 'update' | 'deletion';
}

export function useDeleteTaskDialog({
  selectedLogId,
  type,
}: DeleteLogDialogProps) {
  const queryClient = useQueryClient();

  const {
    isDeleteTaskDialogOpen,
    handleOpenDeleteTaskDialog,
    handleCloseDeleteTaskDialog,
  } = useTaskAuditLog();

  const { deleteTaskAuditLog, isDeleteTaskAuditLogLoading } =
    useDeleteTaskAuditLogMutation();

  async function handleDeleteLog() {
    try {
      await deleteTaskAuditLog(selectedLogId);

      queryClient.invalidateQueries({
        queryKey: [`task-${type}-audit-logs`],
      });

      toast({
        type: 'successful-delete',
        description: `O audit log foi excluído com sucesso.`,
      });

      handleCloseDeleteTaskDialog();
    } catch (error) {
      toast({
        type: 'error',
        description: `Houve um erro ao excluir o audit log.`,
      });
    }
  }

  return {
    handleDeleteLog,
    handleOpenDeleteTaskDialog,
    handleCloseDeleteTaskDialog,
    isDeleteTaskAuditLogLoading,
    isDeleteTaskDialogOpen,
  };
}
