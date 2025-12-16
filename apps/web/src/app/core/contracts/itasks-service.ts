import type { Task } from '@/app/entities/task';
import type { HttpRequestConfig } from './ihttp-client';

import type { CreateTaskData, UpdateTaskData } from '@/types/task-data';
import type { ListTasksPagination, Pagination } from '@challenge/shared';

export abstract class ITasksService {
  abstract get(taskId: string, config?: HttpRequestConfig): Promise<Task>;
  abstract list(
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListTasksPagination & { tasks: Task[] }>;
  abstract create(
    data: CreateTaskData,
    config?: HttpRequestConfig,
  ): Promise<Task>;
  abstract update(
    taskId: string,
    data: UpdateTaskData,
    config?: HttpRequestConfig,
  ): Promise<void>;
  abstract delete(taskId: string, config?: HttpRequestConfig): Promise<void>;
}
