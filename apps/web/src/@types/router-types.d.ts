import { router } from '../router';

export interface AuthLayoutProps {
  lead?: string;
  description?: string;
  calloutText?: string;
  authPrompt?: string;
  authLinkLabel?: string;
  href?: '/login' | '/register';
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    routeMeta: AuthLayoutProps;
  }

  interface StaticDataRouteOption extends AuthLayoutProps {}
}
