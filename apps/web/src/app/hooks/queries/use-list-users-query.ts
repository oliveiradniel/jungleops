import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '@/app/factories/make-users-service';

export function useListUsersQuery() {
  const usersService = makeUsersService();

  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list(),
  });

  return {
    users: data,
    isUsersLoading: isPending,
  };
}
