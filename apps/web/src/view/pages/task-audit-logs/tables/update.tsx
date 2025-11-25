import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';

import { formatDateToBR } from '@/app/utils/format-date-br';
import { fieldLabels, priorityLabels, statusLabels } from '@/config/labels';

import { Skeleton } from '@/view/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { FieldName } from '@challenge/shared';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>

            <TableHead>Campo</TableHead>

            <TableHead>Valor antigo</TableHead>

            <TableHead>Valor atual</TableHead>

            <TableHead>Data de atualização</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {taskUpdateAuditLogsList.map(
            ({ taskTitle, fieldName, oldValue, newValue, changedAt }) => (
              <TableRow>
                <TableCell>{taskTitle}</TableCell>
                <TableCell>{fieldLabels[fieldName as FieldName]}</TableCell>
                <TableCell>
                  {fieldName === 'priority'
                    ? priorityLabels[oldValue as TaskPriority]
                    : fieldName === 'status'
                      ? statusLabels[oldValue as TaskStatus]
                      : oldValue}
                </TableCell>
                <TableCell>
                  {fieldName === 'priority'
                    ? priorityLabels[newValue as TaskPriority]
                    : fieldName === 'status'
                      ? statusLabels[newValue as TaskStatus]
                      : newValue}
                </TableCell>

                <TableCell>{formatDateToBR(changedAt)}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>

      {isTaskUpdateAuditLogsLoading && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-10" />
          ))}
        </div>
      )}
    </>
  );
}
