import { useQuery } from '@tanstack/react-query';
import { makeTaskAuditLogsService } from '../../factories/make-task-audit-logs-service';

export function useListTaskAuditLogsQuery() {
  const taskAuditLogsService = makeTaskAuditLogsService();

  const { data, isPending } = useQuery({
    queryKey: ['task-audit-logs'],
    queryFn: () => taskAuditLogsService.list(),
  });

  return {
    taskAuditLogsList: data ?? [],
    isTaskAuditLogsLoading: isPending,
  };
}
