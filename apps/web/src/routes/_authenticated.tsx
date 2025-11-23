import { useTasks } from '@/app/hooks/use-tasks';
import { DeleteTaskDialog } from '@/view/components/delete-task-dialog';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: () => <RouteComponent />,
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

      <Outlet />
    </>
  );
}
