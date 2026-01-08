import { makeUsersTasksService } from '@/app/factories/make-users-tasks-service';
import { useQuery } from '@tanstack/react-query';

export function useListUsersByTaskIdQuery({ taskId }: { taskId: string }) {
  const usersTasksService = makeUsersTasksService();

  const { data, isPending } = useQuery({
    queryKey: ['users-tasks', taskId],
    queryFn: () => usersTasksService.listUsersByTaskId(taskId),
    enabled: !!taskId,
  });

  return {
    participants: data,
    isParticipantsLoading: isPending,
  };
}
