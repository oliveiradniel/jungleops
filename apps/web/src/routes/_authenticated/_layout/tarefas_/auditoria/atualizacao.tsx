import { createFileRoute } from '@tanstack/react-router';

import { TaskUpdateAuditLogTable } from '@/view/pages/task-audit-logs/tables/update-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria/atualizacao',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskUpdateAuditLogTable />;
}
