import { createFileRoute } from '@tanstack/react-router';

import { TaskUpdateAuditLogTable } from '@/view/pages/task-audit-logs/tables/update-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria/atualizacao',
)({
  head: () => ({
    meta: [
      {
        title: 'Auditoria de Atualização - JungleOps',
      },
      {
        name: 'description',
        content:
          'Visualize todas as alterações feitas nos registros do sistema JungleOps. Saiba o que foi modificado, por quem e quando.',
      },
    ],
  }),

  component: RouteComponent,
});

function RouteComponent() {
  return <TaskUpdateAuditLogTable />;
}
