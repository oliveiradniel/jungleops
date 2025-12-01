import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useColumns } from './use-columns';

import { DataTable } from '@/view/components/data-table';

export function TaskDeletionAuditLogTable() {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const columns = useColumns();

  return (
    <>
      <DataTable
        data={taskDeletionAuditLogsList}
        columns={columns}
        fallbackColumns={[
          'Autor',
          'Título',
          'Valores na exclusão',
          'Data/hora da exclusão',
        ]}
        isLoading={isTaskDeletionAuditLogsLoading}
      />
    </>
  );
}
