import { CreateUserTaskData, UserTask } from '@challenge/shared';

export abstract class IUsersTasksRepository {
  abstract getUserIdsByTaskId(taskId: string): Promise<string[]>;
  abstract getTaskIdsByUserId(userId: string): Promise<string[]>;
  abstract getUsersTasksByTaskId(taskId: string): Promise<UserTask[]>;
  abstract create(data: CreateUserTaskData): Promise<UserTask>;
}
