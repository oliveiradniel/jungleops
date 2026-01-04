import { TaskAuditLogs } from '@/view/pages/task-audit-logs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_layout/tasks_/audit-logs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskAuditLogs />;
}
