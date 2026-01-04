import { createFileRoute } from '@tanstack/react-router';

import { TaskCreationAuditLogTable } from '@/view/pages/task-audit-logs/tables/creation-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tasks_/audit-logs/creation',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskCreationAuditLogTable />;
}
