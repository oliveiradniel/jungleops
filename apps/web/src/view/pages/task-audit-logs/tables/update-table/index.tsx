import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';

import { DataTable } from '@/view/components/data-table';
import { useColumns } from './use-columns';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  const columns = useColumns();

  return (
    <DataTable
      data={taskUpdateAuditLogsList}
      columns={columns}
      fallbackColumns={[
        'Autor',
        'Título',
        'Campo',
        'Valor antigo',
        'Valor atual',
        'Data/horário da atualização',
      ]}
      isLoading={isTaskUpdateAuditLogsLoading}
    />
  );
}
