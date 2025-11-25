import { useQuery } from '@tanstack/react-query';

import { makeTaskAuditLogsService } from '../../factories/make-task-audit-logs-service';

export function useListTaskCreationAuditLogQuery() {
  const taskAuditLogsService = makeTaskAuditLogsService();

  const { data, isPending } = useQuery({
    queryKey: ['task-creation-audit-logs'],
    queryFn: () => taskAuditLogsService.listTaskCreationAuditLog(),
  });

  return {
    taskCreationAuditLogsList: data ?? [],
    isTaskCreationAuditLogsLoading: isPending,
  };
}
