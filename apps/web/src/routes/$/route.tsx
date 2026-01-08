import { createFileRoute } from '@tanstack/react-router';

import { NotFound } from './not-found';

export const Route = createFileRoute('/$')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}
