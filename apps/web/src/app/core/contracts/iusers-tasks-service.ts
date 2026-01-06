import type { HttpRequestConfig } from './ihttp-client';

import type {
  CreateUserTaskData,
  Participant,
  UserTask,
} from '@challenge/shared';

export abstract class IUsersTasksService {
  abstract listUsersByTaskId(
    taskId: string,
    config?: HttpRequestConfig,
  ): Promise<Participant[]>;
  abstract create(
    data: CreateUserTaskData,
    config?: HttpRequestConfig,
  ): Promise<UserTask>;
}
