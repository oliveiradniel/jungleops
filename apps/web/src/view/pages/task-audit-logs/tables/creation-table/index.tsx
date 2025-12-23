import { useListTaskCreationAuditLogQuery } from '@/app/hooks/queries/use-list-task-creation-audit-log-query';
import { useColumns } from './use-columns';

import { priorityLabels, statusLabels } from '@/config/labels';

import { DataTable } from '@/view/components/data-table';
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown';
import { DataTableContent } from '@/view/components/data-table/data-table-content';
import { DataTableFallback } from '@/view/components/data-table/data-table-fallback';
import { EmptyLog } from './empty-log';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';
import { DataTableUniqueFacetedFilter } from '@/view/components/data-table/data-table-unique-faceted-filter';

import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import { DataTablePagination } from '@/view/components/data-table/data-table-pagination';

export function TaskCreationAuditLogTable() {
  const { taskCreationAuditLogsList, isTaskCreationAuditLogsLoading } =
    useListTaskCreationAuditLogQuery();

  const columns = useColumns();

  return (
    <div>
      {!isTaskCreationAuditLogsLoading &&
        taskCreationAuditLogsList.length === 0 && <EmptyLog />}

      {isTaskCreationAuditLogsLoading && (
        <DataTableFallback
          fallbackColumns={[
            'Autor',
            'Título',
            'Valores na criação',
            'Data/hora da criação',
          ]}
        />
      )}

      <DataTable
        data={taskCreationAuditLogsList}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
      >
        {taskCreationAuditLogsList.length > 0 && (
          <div className="mb-2 flex items-center gap-4">
            <DataTableTextFilter placeholder="Procurar por autor ou título" />

            <div className="flex items-center gap-1">
              <DataTableUniqueFacetedFilter<TaskStatus>
                placeholder="Status"
                column="status"
                labels={statusLabels}
              />

              <DataTableUniqueFacetedFilter<TaskPriority>
                placeholder="Prioridade"
                column="priority"
                labels={priorityLabels}
              />

              <DataTableColumnsVisibilityDropdown />
            </div>
          </div>
        )}

        <DataTablePagination />

        {!isTaskCreationAuditLogsLoading &&
          taskCreationAuditLogsList.length > 0 && <DataTableContent />}
      </DataTable>
    </div>
  );
}
