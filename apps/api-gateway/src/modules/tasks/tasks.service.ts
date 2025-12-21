import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getConfig } from 'src/shared/config/config.helper';
import { firstValueFrom } from 'rxjs';

import {
  CreateTaskData,
  Task,
  TasksFilters,
  TasksList,
  UpdateTaskData,
} from '@challenge/shared';

@Injectable()
export class TasksService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.baseURL = getConfig(configService).TASKS_SERVICE_BASE_URL;
  }

  async findById(taskId: string): Promise<Task> {
    const { data } = await firstValueFrom(
      this.httpService.get<Task>(`${this.baseURL}/${taskId}`),
    );

    return data;
  }

  async list(filters: TasksFilters): Promise<TasksList> {
    const { page, size, status, priority } = filters;

    const { data } = await firstValueFrom(
      this.httpService.get<TasksList, { params: TasksFilters }>(
        `${this.baseURL}`,
        {
          params: {
            page,
            size,
            status,
            priority,
          },
        },
      ),
    );

    return data;
  }

  async listTasksByUserId(userId: string): Promise<Task[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Task[]>(`${this.baseURL}/user/${userId}`),
    );

    return data;
  }

  async create(dataToCreate: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } =
      dataToCreate;

    const { data } = await firstValueFrom(
      this.httpService.post<Task, CreateTaskData>(`${this.baseURL}`, {
        authorId,
        title,
        description,
        term,
        priority,
        status,
      }),
    );

    return data;
  }

  async update(taskId: string, dataToUpdate: UpdateTaskData): Promise<void> {
    const {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    } = dataToUpdate;

    await firstValueFrom(
      this.httpService.put<void>(`${this.baseURL}/${taskId}`, {
        lastEditedBy,
        userIds,
        title,
        description,
        term,
        priority,
        status,
      }),
    );
  }

  async delete(taskId: string, userId: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(`${this.baseURL}/${taskId}`, {
        headers: {
          'deleted-by': userId,
        },
      }),
    );
  }
}
