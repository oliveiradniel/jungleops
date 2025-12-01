import { Link } from '@tanstack/react-router';

import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';
import { useColumns } from './use-columns';

import { BookOpenText } from 'lucide-react';
import { cn } from '@/lib/utils';

import { DataTable } from '@/view/components/data-table';
import { EmptyData } from '@/view/components/empty-data';
import { Button } from '@/view/components/ui/button';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  const columns = useColumns();

  const textStyles = 'text-primary font-medium';

  return (
    <>
      {!isTaskUpdateAuditLogsLoading &&
        taskUpdateAuditLogsList.length === 0 && (
          <EmptyData>
            <p className="max-w-[500px] text-center">
              Ainda não há registro de nenhuma tarefa atualizada para ser
              listada na auditoria de atualização. Você pode atualizar o
              <span className={cn(textStyles)}> título</span>,
              <span className={cn(textStyles)}> descrição</span>,
              <span className={cn(textStyles)}> prazo</span>,
              <span className={cn(textStyles)}> prioridade</span>,
              <span className={cn(textStyles)}> status</span> e até adicionar
              <span className={cn(textStyles)}> novos usuários</span> à tarefa.
            </p>

            <Button onClick={() => {}} className="p-6">
              <Link to="/tasks" className="flex items-center gap-2">
                <BookOpenText className="size-4!" /> Ir até as tarefas
              </Link>
            </Button>
          </EmptyData>
        )}

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
    </>
  );
}
