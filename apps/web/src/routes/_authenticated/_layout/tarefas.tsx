import { createFileRoute } from '@tanstack/react-router';

import { Tasks } from '@/view/pages/tasks';
import { TaskFiltersSchema } from '@/app/schemas/task-filters-schema';

export const Route = createFileRoute('/_authenticated/_layout/tarefas')({
  validateSearch: TaskFiltersSchema,
  head: () => ({
    meta: [
      {
        title: 'Tarefas - JungleOps',
      },
      {
        name: 'description',
        content:
          'Gerencie suas tarefas e colabore com sua equipe no JungleOps de forma rápida e eficiente.',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Tasks />;
}
