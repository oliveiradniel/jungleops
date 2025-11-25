import { TaskCreationAuditLogTable } from '@/view/pages/task-audit-logs/tables/creation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/tasks_/audit-logs/creation',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskCreationAuditLogTable />;
}
