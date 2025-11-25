import { TaskUpdateAuditLogTable } from '@/view/pages/task-audit-logs/tables/update';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/tasks_/audit-logs/update',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskUpdateAuditLogTable />;
}
