import { useMutation } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

import type { UpdateTaskData } from '@/types/task-data';

export function useUpdateTaskMutation() {
  const tasksService = makeTasksService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskData }) =>
      tasksService.update(taskId, data),
  });

  return {
    updateTask: mutateAsync,
    isUpdateTaskLoading: isPending,
  };
}
