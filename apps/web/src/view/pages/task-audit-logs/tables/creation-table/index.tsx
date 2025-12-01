import { useTasks } from '@/app/hooks/use-tasks';
import { useListTaskCreationAuditLogQuery } from '@/app/hooks/queries/use-list-task-creation-audit-log-query';
import { useColumns } from './use-columns';

import notFoundImage from '@/assets/images/tasks-not-found.svg';
import { Plus } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import { DataTable } from '@/view/components/data-table';

export function TaskCreationAuditLogTable() {
  const { handleOpenNewTaskSheet } = useTasks();

  const { taskCreationAuditLogsList, isTaskCreationAuditLogsLoading } =
    useListTaskCreationAuditLogQuery();

  const columns = useColumns();

  return (
    <div className="h-full">
      {!isTaskCreationAuditLogsLoading &&
        taskCreationAuditLogsList.length === 0 && (
          <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
            <img src={notFoundImage} alt="" className="h-60" />

            <p className="max-w-[500px] text-center">
              Não há registro de nenhuma tarefa criada para ser listada na
              auditoria de criação. Que tal adicionar uma agora e melhorar o seu{' '}
              <span className="text-primary font-medium">
                fluxo de trabalho
              </span>{' '}
              e{' '}
              <span className="text-primary font-medium">
                controle de prazos
              </span>
              ?
            </p>

            <Button onClick={handleOpenNewTaskSheet} className="p-6!">
              <Plus className="size-4!" /> Adicionar tarefa
            </Button>
          </div>
        )}

      <DataTable
        data={taskCreationAuditLogsList}
        columns={columns}
        fallbackColumns={[
          'Autor',
          'Título',
          'Valores na criação',
          'Data/hora da criação',
        ]}
        isLoading={isTaskCreationAuditLogsLoading}
      />
    </div>
  );
}
