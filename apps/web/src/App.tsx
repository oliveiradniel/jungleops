import { RouterProvider } from '@tanstack/react-router';

import { Toaster } from 'sonner';

import { AuthProvider } from './app/providers/auth-provider';
import { TasksProvider } from './app/providers/tasks-provider';

import { router } from './router';
import { queryClient } from './lib/query-client';

export function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router} context={{ queryClient }} />

        <Toaster duration={6000} position="top-center" />
      </TasksProvider>
    </AuthProvider>
  );
}
