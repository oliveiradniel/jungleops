import { useMutation } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

export function useDeleteTaskMutation() {
  const tasksService = makeTasksService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (taskId: string) => tasksService.delete(taskId),
  });

  return {
    deleteTask: mutateAsync,
    isDeleteTaskLoading: isPending,
  };
}
