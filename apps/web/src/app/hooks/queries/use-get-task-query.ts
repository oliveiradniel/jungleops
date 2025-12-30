import { makeTasksService } from '@/app/factories/make-tasks-service';
import { useQuery } from '@tanstack/react-query';

export function useGetTaskQuery(taskId: string) {
  const tasksService = makeTasksService();

  const { data, isPending, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => tasksService.get(taskId),
  });

  return {
    task: data,
    isTaskLoading: isPending,
    hasError: error,
  };
}
