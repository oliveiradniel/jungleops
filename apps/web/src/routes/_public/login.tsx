import { createFileRoute } from '@tanstack/react-router';

import { Login } from '@/view/pages/login';

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
