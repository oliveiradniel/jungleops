import { TaskMapper } from '@/app/mappers/task-mapper';

import type { Task } from '@/app/entities/task';
import type { ITasksService } from '../contracts/itasks-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type { CreateTaskData, UpdateTaskData } from '@/types/task-data';
import type {
  ListTasksPagination,
  Pagination,
  TaskWithCommentCount,
} from '@challenge/shared';

export class TasksService implements ITasksService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async get(taskId: string, config?: HttpRequestConfig): Promise<Task> {
    const task = await this.httpClient.get<TaskWithCommentCount>(
      `/tasks/${taskId}`,
      config,
    );

    return TaskMapper.toDomain(task);
  }

  async list(
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListTasksPagination & { tasks: Task[] }> {
    const { page, size } = data;

    const tasks = await this.httpClient.get<ListTasksPagination>('/tasks', {
      params: { page, size },
      ...config,
    });

    return TaskMapper.toDomainList(tasks);
  }

  async create(
    data: CreateTaskData,
    config?: HttpRequestConfig,
  ): Promise<Task> {
    const { title, description, term, priority, status } = data;

    const task = await this.httpClient.post<TaskWithCommentCount>(
      '/tasks',
      TaskMapper.toCreatePersistence({
        title,
        description,
        term,
        priority,
        status,
      }),
      config,
    );

    return TaskMapper.toDomain(task);
  }

  async update(
    taskId: string,
    data: UpdateTaskData,
    config?: HttpRequestConfig,
  ): Promise<void> {
    const { userIds, title, description, term, priority, status } = data;

    await this.httpClient.put(
      `/tasks/${taskId}`,
      TaskMapper.toUpdatePersistence({
        userIds,
        title,
        description,
        term,
        priority,
        status,
      }),
      config,
    );
  }

  async delete(taskId: string, config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.delete(`/tasks/${taskId}`, config);
  }
}
