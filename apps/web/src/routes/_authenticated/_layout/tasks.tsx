import { createFileRoute } from '@tanstack/react-router';

import { Tasks } from '@/view/pages/tasks';
import { TaskFiltersSchema } from '@/app/schemas/task-filters-schema';

export const Route = createFileRoute('/_authenticated/_layout/tasks')({
  validateSearch: TaskFiltersSchema,

  component: RouteComponent,
});

function RouteComponent() {
  return <Tasks />;
}
