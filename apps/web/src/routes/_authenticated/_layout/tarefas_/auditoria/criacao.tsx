import { createFileRoute } from '@tanstack/react-router';

import { TaskCreationAuditLogTable } from '@/view/pages/task-audit-logs/tables/creation-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria/criacao',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskCreationAuditLogTable />;
}
