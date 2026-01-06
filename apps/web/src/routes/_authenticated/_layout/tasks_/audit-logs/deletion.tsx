import { createFileRoute } from '@tanstack/react-router';

import { TaskDeletionAuditLogTable } from '@/view/pages/task-audit-logs/tables/deletion-table';

export const Route = createFileRoute(
  '/_authenticated/_layout/tasks_/audit-logs/deletion',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskDeletionAuditLogTable />;
}
