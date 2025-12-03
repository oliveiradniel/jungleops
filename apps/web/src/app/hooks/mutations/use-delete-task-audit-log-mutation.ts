import { useMutation } from '@tanstack/react-query';

import { makeTaskAuditLogsService } from '@/app/factories/make-task-audit-logs-service';

export function useDeleteTaskAuditLogMutation() {
  const taskAuditLogsService = makeTaskAuditLogsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => taskAuditLogsService.delete(id),
  });

  return {
    deleteTaskAuditLog: mutateAsync,
    isDeleteTaskAuditLogLoading: isPending,
  };
}
