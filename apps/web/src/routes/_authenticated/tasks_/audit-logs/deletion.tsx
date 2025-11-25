import { TaskDeletionAuditLogTable } from '@/view/pages/task-audit-logs/tables/deletion';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/tasks_/audit-logs/deletion',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskDeletionAuditLogTable />;
}
