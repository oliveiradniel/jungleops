import { TaskMapper } from '@/app/mappers/task-mapper';

import type { Task } from '@/app/entities/task';
import type { ITasksService } from '../contracts/itasks-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type { CreateTaskData, UpdateTaskData } from '@/types/task-data';
import type {
  TaskFilters,
  TasksList,
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
    filters: TaskFilters,
    config?: HttpRequestConfig,
  ): Promise<TasksList & { tasks: Task[] }> {
    const { page, size, status, priority } = filters;

    const facetedFilters: any = {};

    if (typeof status === 'string') {
      facetedFilters.status = status;
    }

    if (typeof priority === 'string') {
      facetedFilters.priority = priority;
    }

    const tasks = await this.httpClient.get<TasksList>('/tasks', {
      params: { page, size, ...facetedFilters },
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
