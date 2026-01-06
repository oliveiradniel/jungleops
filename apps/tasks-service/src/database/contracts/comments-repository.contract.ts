import type {
  CreateCommentData,
  Pagination,
  TaskComment,
  ListCommentsPagination,
} from '@challenge/shared';

export abstract class ICommentsRepository {
  abstract list(
    taskId: string,
    pagination: Pagination,
  ): Promise<ListCommentsPagination>;
  abstract countByTaskId(taskId: string): Promise<number>;
  abstract create(
    taskId: string,
    data: CreateCommentData,
  ): Promise<TaskComment>;
}
