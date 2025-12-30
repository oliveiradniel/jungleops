import type { QueryClient } from '@tanstack/react-query';

export type InvalidateQuery =
  | { queryKey: ['task', taskId: string]; exact?: boolean }
  | { queryKey: ['comments', taskId: string, page?: string]; exact?: boolean }
  | { queryKey: ['task-creation-audit-logs']; exact?: boolean }
  | { queryKey: ['task-deletion-audit-logs']; exact?: boolean }
  | { queryKey: ['task-update-audit-logs']; exact?: boolean }
  | {
      queryKey: [
        'tasks',
        page?: number,
        size?: number,
        orderBy?: string,
        order?: string,
        status?: string,
        priority?: string,
        search?: string,
      ];
      exact?: boolean;
    }
  | { queryKey: ['unread-notifications']; exact?: boolean }
  | { queryKey: ['read-notifications']; exact?: boolean }
  | { queryKey: ['users-tasks', taskId: string]; exact?: boolean }
  | { queryKey: ['users']; exact?: boolean }
  | { queryKey: ['session']; exact?: boolean };

interface InvalidateQueriesParams {
  queryClient: QueryClient;
  invalidateQuery: InvalidateQuery[];
}

export function invalidateQueries({
  queryClient,
  invalidateQuery,
}: InvalidateQueriesParams) {
  invalidateQuery.forEach(({ queryKey, exact = true }) => {
    queryClient.invalidateQueries({ queryKey, exact });
  });
}
