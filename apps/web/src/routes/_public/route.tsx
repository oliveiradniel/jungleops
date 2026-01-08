import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { sessionQuery } from '@/lib/queries/session';

export const Route = createFileRoute('/_public')({
  validateSearch: (search) => {
    const destination =
      search.redirect === '/login' || search.redirect === '/cadastro'
        ? '/tarefas'
        : (search.redirect as string);

    return {
      redirect: destination,
    };
  },
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(sessionQuery);

    if (user) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
