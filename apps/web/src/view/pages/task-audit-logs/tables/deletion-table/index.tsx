import { Link } from '@tanstack/react-router';

import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useColumns } from './use-columns';

import { BookOpenText } from 'lucide-react';

import { DataTable } from '@/view/components/data-table';
import { EmptyData } from '@/view/components/empty-data';
import { Button } from '@/view/components/ui/button';

export function TaskDeletionAuditLogTable() {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const columns = useColumns();

  return (
    <>
      {!isTaskDeletionAuditLogsLoading &&
        taskDeletionAuditLogsList.length === 0 && (
          <EmptyData>
            <p className="max-w-[500px] text-center">
              Não há registro de nenhuma tarefa excluída para ser listada na
              auditoria de exclusão. Você pode excluir qualquer tarefa a partir
              da listagem principal.
            </p>

            <Button onClick={() => {}} className="p-6">
              <Link to="/tasks" className="flex items-center gap-2">
                <BookOpenText className="size-4!" /> Ir até as tarefas
              </Link>
            </Button>
          </EmptyData>
        )}

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
