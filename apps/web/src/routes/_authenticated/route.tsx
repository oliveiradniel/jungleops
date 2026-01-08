/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useTasks } from '@/app/hooks/use-tasks';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { sessionQuery } from '@/lib/queries/session';

import { DeleteTaskDialog } from '@/view/components/delete-task-dialog';
import { NewTaskSheet } from '@/view/components/new-task-sheet';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(sessionQuery);

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskToDelete, pageForDelete } = useTasks();
  return (
    <>
      <DeleteTaskDialog
        task={{
          id: taskToDelete?.id!,
          title: taskToDelete?.title!,
          status: taskToDelete?.status!,
          createdAt: taskToDelete?.createdAt!,
        }}
        page={pageForDelete!}
      />

      <NewTaskSheet />

      <Outlet />
    </>
  );
}
