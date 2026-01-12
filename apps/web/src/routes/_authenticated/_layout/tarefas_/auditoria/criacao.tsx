import { createFileRoute } from '@tanstack/react-router';

import { TaskCreationAuditLogTable } from '@/view/pages/task-audit-logs/tables/creation-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria/criacao',
)({
  head: () => ({
    meta: [
      {
        title: 'Auditoria de Criação - JungleOps',
      },
      {
        name: 'description',
        content:
          'Veja todas as ações de criação realizadas no sistema JungleOps. Acompanhe quem criou registros e quando foram adicionados.',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskCreationAuditLogTable />;
}
