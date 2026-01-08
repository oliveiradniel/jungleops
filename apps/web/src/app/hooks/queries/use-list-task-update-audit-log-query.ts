import { useQuery } from '@tanstack/react-query';

import { makeTaskAuditLogsService } from '../../factories/make-task-audit-logs-service';

export function useListTaskUpdateAuditLogQuery() {
  const taskAuditLogsService = makeTaskAuditLogsService();

  const { data, isPending } = useQuery({
    queryKey: ['task-update-audit-logs'],
    queryFn: () => taskAuditLogsService.listTaskUpdateAuditLog(),
  });

  return {
    taskUpdateAuditLogsList: data ?? [],
    isTaskUpdateAuditLogsLoading: isPending,
  };
}
