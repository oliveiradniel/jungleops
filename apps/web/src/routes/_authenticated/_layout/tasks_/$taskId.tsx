import { createFileRoute } from '@tanstack/react-router';

import { Task } from '@/view/pages/task';

import { PaginationSearchSchema } from '@/app/schemas/pagination-search-schema';

export const Route = createFileRoute('/_authenticated/_layout/tasks_/$taskId')({
  validateSearch: PaginationSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <Task />;
}
