import { createFileRoute } from '@tanstack/react-router';

import { TaskDeletionAuditLogTable } from '@/view/pages/task-audit-logs/tables/deletion-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria/exclusao',
)({
  head: () => ({
    meta: [
      {
        title: 'Auditoria de Exclusão - JungleOps',
      },
      {
        name: 'description',
        content:
          'Acompanhe todos os registros que foram excluídos no sistema JungleOps, incluindo usuário responsável e data da exclusão.',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskDeletionAuditLogTable />;
}
