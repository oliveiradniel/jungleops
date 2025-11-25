import { useQuery } from '@tanstack/react-query';

import { makeTaskAuditLogsService } from '../../factories/make-task-audit-logs-service';

export function useListTaskDeletionAuditLogQuery() {
  const taskAuditLogsService = makeTaskAuditLogsService();

  const { data, isPending } = useQuery({
    queryKey: ['task-deletion-audit-logs'],
    queryFn: () => taskAuditLogsService.listTaskDeletionAuditLog(),
  });

  return {
    taskDeletionAuditLogsList: data ?? [],
    isTaskDeletionAuditLogsLoading: isPending,
  };
}
