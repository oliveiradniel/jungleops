import { makeTasksService } from '@/app/factories/make-tasks-service';
import { useQuery } from '@tanstack/react-query';

export function useGetTaskQuery(taskId: string) {
  const tasksService = makeTasksService();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => tasksService.get(taskId),
  });

  return {
    task: data,
    isTaskLoading: isPending,
    isTasksFetching: isFetching,
    hasError: error,
  };
}
