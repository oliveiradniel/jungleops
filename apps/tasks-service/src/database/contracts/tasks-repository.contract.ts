import type {
  CreateTaskData,
  TasksList,
  Task,
  TaskFilters,
  TaskWithCommentCount,
  UpdateTaskData,
} from '@challenge/shared';

export abstract class ITasksRepository {
  abstract getById(id: string): Promise<Task | null>;
  abstract getByTitle(title: string): Promise<Task | null>;
  abstract getByIdWithCommentsCount(
    id: string,
  ): Promise<TaskWithCommentCount | null>;
  abstract list(filters: TaskFilters): Promise<TasksList>;
  abstract create(data: CreateTaskData): Promise<Task>;
  abstract update(id: string, data: UpdateTaskData): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
