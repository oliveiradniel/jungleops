import { createFileRoute } from '@tanstack/react-router';

import { Register } from '@/view/pages/register';

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
