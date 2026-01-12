import { createFileRoute } from '@tanstack/react-router';

import { Task as TaskComponent } from '@/view/pages/task';

import { PaginationSearchSchema } from '@/app/schemas/pagination-search-schema';
import { makeHttpClient } from '@/app/factories/make-http-client';

import type { Task } from '@/app/entities/task';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/$taskId',
)({
  validateSearch: PaginationSearchSchema,
  loader: async ({ params }) => {
    const tasksService = makeHttpClient();

    const { title, description } = await tasksService.get<Task>(
      `/tasks/${params.taskId}`,
    );

    return { task: { title, description } };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.task.title} - JungleOps`,
      },
      {
        name: 'description',
        content: loaderData?.task.description,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskComponent />;
}
